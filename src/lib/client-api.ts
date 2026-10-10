import { buildQuery, type RequestOptions } from "@/lib/query";
import { parseApiResponse } from "@/lib/api-error";

export async function clientFetch<T>(path: string, { method = "GET", body, query }: RequestOptions = {}): Promise<T> {
  const res = await fetch(`/api/proxy${path}${buildQuery(query)}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  return parseApiResponse<T>(res);
}