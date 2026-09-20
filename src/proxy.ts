import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {
  const { pathname, search } = request.nextUrl;
  const session = request.auth;

  const isAdminRoute = pathname.startsWith("/admin");
  const isEventiRoute = pathname.startsWith("/eventi");

  if (isAdminRoute) {
    if (!session?.user) {
      const loginUrl = new URL("/login", request.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(loginUrl);
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }
  }

  if (isEventiRoute && !session?.user) {
    const loginUrl = new URL("/login", request.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/eventi/:path*", "/admin/:path*"],
};
