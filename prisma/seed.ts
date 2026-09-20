import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/password";

const db = new PrismaClient();

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const mockEvents = [
  {
    title: "Camminata della Speranza",
    summary: "Una camminata non competitiva di 5km nel parco cittadino per sensibilizzare sul sarcoma di Ewing.",
    description:
      "Una giornata dedicata a famiglie e amici de Il Sogno di Ale: percorso di 5km aperto a tutti, punto ristoro solidale, animazione per bambini e un momento di testimonianza. Il ricavato delle iscrizioni sarà interamente devoluto al fondo ricerca.",
    location: "Parco Nord, Milano",
    coverImageUrl: "https://picsum.photos/seed/ale-evento-1/1200/800",
    startsAt: new Date("2026-10-18T09:30:00Z"),
    endsAt: new Date("2026-10-18T13:00:00Z"),
    capacity: 200,
  },
  {
    title: "Cena di Beneficenza",
    summary: "Serata di raccolta fondi con cena, asta benefica e musica dal vivo.",
    description:
      "Una serata elegante per sostenere la ricerca sul sarcoma di Ewing: menu a cura di chef locali, asta di opere donate da artisti amici della fondazione e musica dal vivo. Posti limitati, prenotazione obbligatoria.",
    location: "Villa Comunale, Bergamo",
    coverImageUrl: "https://picsum.photos/seed/ale-evento-2/1200/800",
    startsAt: new Date("2026-11-07T19:30:00Z"),
    endsAt: new Date("2026-11-07T23:30:00Z"),
    capacity: 120,
  },
  {
    title: "Mercatino di Natale Solidale",
    summary: "Bancarelle, laboratori per bambini e vin brulè: il Natale de Il Sogno di Ale.",
    description:
      "Torna il tradizionale mercatino natalizio: oggetti artigianali, dolci fatti in casa, laboratori creativi per i più piccoli e un angolo dedicato alle informazioni sulla ricerca finanziata dalla fondazione nell'ultimo anno.",
    location: "Piazza Duomo, Como",
    coverImageUrl: "https://picsum.photos/seed/ale-evento-3/1200/800",
    startsAt: new Date("2026-12-13T10:00:00Z"),
    endsAt: new Date("2026-12-13T19:00:00Z"),
    capacity: 300,
  },
  {
    title: "Convegno Scientifico: stato dell'arte sul sarcoma di Ewing",
    summary: "Incontro aperto al pubblico con gli oncologi pediatrici partner della fondazione.",
    description:
      "Un pomeriggio di divulgazione scientifica rivolto a famiglie, operatori sanitari e volontari: i risultati dei progetti di ricerca finanziati, le nuove terapie in sperimentazione e uno spazio di dialogo con gli specialisti.",
    location: "Aula Magna, Università degli Studi, Pavia",
    coverImageUrl: "https://picsum.photos/seed/ale-evento-4/1200/800",
    startsAt: new Date("2027-02-20T15:00:00Z"),
    endsAt: new Date("2027-02-20T18:00:00Z"),
    capacity: 150,
  },
];

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@ilsognodiale.it";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";
  const adminName = process.env.SEED_ADMIN_NAME ?? "Amministratore";

  const admin = await db.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      role: "ADMIN",
      passwordHash: await hashPassword(adminPassword),
    },
  });

  const demoUser = await db.user.upsert({
    where: { email: "utente.demo@ilsognodiale.it" },
    update: {},
    create: {
      email: "utente.demo@ilsognodiale.it",
      name: "Utente Demo",
      role: "USER",
      passwordHash: await hashPassword("Demo1234!"),
    },
  });

  for (const event of mockEvents) {
    await db.event.upsert({
      where: { slug: slugify(event.title) },
      update: {},
      create: {
        ...event,
        slug: slugify(event.title),
        createdById: admin.id,
      },
    });
  }

  const primoEvento = await db.event.findFirst({ orderBy: { startsAt: "asc" } });
  if (primoEvento) {
    await db.registration.upsert({
      where: { userId_eventId: { userId: demoUser.id, eventId: primoEvento.id } },
      update: {},
      create: { userId: demoUser.id, eventId: primoEvento.id },
    });
  }

  console.log("Seed completato.");
  console.log(`  Admin:  ${adminEmail} / ${adminPassword}`);
  console.log(`  Utente: utente.demo@ilsognodiale.it / Demo1234!`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
