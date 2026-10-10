import { parseApiResponse } from "@/lib/api-error";

export async function authRequest<T>(path: "/api/auth/login" | "/api/auth/register", body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseApiResponse<T>(res);
}