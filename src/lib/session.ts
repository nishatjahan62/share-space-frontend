import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import type { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";
import { COOKIE_ACCESS, COOKIE_REFRESH, ROLE_HOME } from "@/lib/constants";
import type { Role, User } from "@/types";

const DAY = 60 * 60 * 24;
const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export function setSessionCookies(res: NextResponse, tokens: { accessToken: string; refreshToken: string }) {
  res.cookies.set(COOKIE_ACCESS, tokens.accessToken, { ...cookieBase, maxAge: DAY });
  res.cookies.set(COOKIE_REFRESH, tokens.refreshToken, { ...cookieBase, maxAge: DAY * 7 });
}

export function clearSessionCookies(res: NextResponse) {
  res.cookies.delete(COOKIE_ACCESS);
  res.cookies.delete(COOKIE_REFRESH);
}

// Verified by the backend; cached per request so layouts and pages share one call
export const getSession = cache(async (): Promise<User | null> => {
  try {
    return await apiFetch<User>("/users/me");
  } catch {
    return null;
  }
});

// Use at the top of each role layout: redirects to /login, or to the user's own dashboard
export async function requireRole(role: Role): Promise<User> {
  const user = await getSession();
  if (!user) redirect("/login");
  if (user.role !== role) redirect(ROLE_HOME[user.role]);
  return user;
}