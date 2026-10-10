import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
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

export const getSession = cache(async (): Promise<User | null> => {
  const token = (await cookies()).get(COOKIE_ACCESS)?.value;
  if (!token) return null;
  try {
    return await apiFetch<User>("/users/me");
  } catch {
    return null;
  }
});

export async function requireRole(role: Role): Promise<User> {
  const user = await getSession();
  if (!user) redirect("/login");
  if (user.role !== role) redirect(ROLE_HOME[user.role]);
  return user;
}