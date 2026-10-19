import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/password";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Il provider Google è attivo solo se le credenziali OAuth sono configurate.
export const isGoogleAuthEnabled = Boolean(
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credenziali",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await db.user.findUnique({ where: { email: email.toLowerCase() } });
        // Gli utenti registrati solo con Google non hanno una password locale.
        if (!user || !user.passwordHash) return null;

        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    ...(isGoogleAuthEnabled ? [Google] : []),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return true;

      const email = profile?.email?.toLowerCase();
      if (!email || profile?.email_verified !== true) {
        return "/login?error=GoogleEmailNotVerified";
      }

      const googleId = account.providerAccountId;

      // Account Google già collegato: accesso diretto.
      const linked = await db.user.findUnique({ where: { googleId } });
      if (linked) return true;

      // Esiste già un account con la stessa email (es. registrato con password):
      // NON lo colleghiamo automaticamente, perché l'email non è verificata alla
      // registrazione con password e qualcuno potrebbe averla occupata in anticipo.
      const sameEmail = await db.user.findUnique({ where: { email } });
      if (sameEmail) return "/login?error=EmailExists";

      // Prima volta con Google: registrazione automatica.
      await db.user.create({
        data: {
          email,
          name: profile?.name?.trim() || email.split("@")[0],
          googleId,
        },
      });
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        // L'oggetto `user` qui è il profilo Google: id e ruolo vanno letti dal DB.
        const dbUser = await db.user.findUnique({
          where: { googleId: account.providerAccountId },
          select: { id: true, role: true },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      } else if (user) {
        token.id = user.id as string;
        token.role = user.role as "USER" | "ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
