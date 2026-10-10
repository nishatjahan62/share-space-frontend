import "server-only";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/server-config";
import { setSessionCookies } from "@/lib/session";
import { decodeRole } from "@/lib/jwt";
import type { ApiResult } from "@/types";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const authHandler = (backendPath: string) => async (req: Request) => {
  let json: ApiResult<Tokens> | null = null;
  let status = 502;

  try {
    const res = await fetch(`${API_URL}${backendPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await req.text(),
      cache: "no-store",
    });
    status = res.status;
    json = await res.json();
  } catch {
    json = null;
  }

  if (!json) {
    return NextResponse.json(
      { success: false, message: "Server is unavailable, please try again", errors: [] },
      { status: 502 },
    );
  }
  if (!json.success) return NextResponse.json(json, { status });

  const response = NextResponse.json({
    success: true,
    message: json.message,
    data: { role: decodeRole(json.data.accessToken) },
  });
  setSessionCookies(response, json.data);
  return response;
};