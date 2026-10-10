import "server-only";
import { cookies } from "next/headers";
import { COOKIE_ACCESS } from "@/lib/constants";
import { API_URL } from "@/lib/server-config";
import { buildQuery, type RequestOptions } from "@/lib/query";
import { parseApiResponse } from "@/lib/api-error";

export async function apiFetch<T>(path: string, { method = "GET", body, query }: RequestOptions = {}): Promise<T> {
  const token = (await cookies()).get(COOKIE_ACCESS)?.value;

  const res = await fetch(`${API_URL}${path}${buildQuery(query)}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });

  return parseApiResponse<T>(res);
}