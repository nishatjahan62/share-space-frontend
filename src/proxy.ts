import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ACCESS, ROLE_HOME, ROUTE_ROLES } from "@/lib/constants";
import { decodeRole } from "@/lib/jwt";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const role = decodeRole(req.cookies.get(COOKIE_ACCESS)?.value);

  const guarded = ROUTE_ROLES.find((r) => pathname === r.prefix || pathname.startsWith(`${r.prefix}/`));

  if (guarded) {
    if (!role) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (role !== guarded.role) return NextResponse.redirect(new URL(ROLE_HOME[role], req.url));
  }

  // Logged-in users have no reason to see login/register
  if (role && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL(ROLE_HOME[role], req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/provider/:path*", "/login", "/register"],
};