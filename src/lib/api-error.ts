import type { ApiResult } from "@/types";

export class ApiRequestError extends Error {
  status: number;
  errors: unknown[];

  constructor(message: string, status: number, errors: unknown[] = []) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.errors = errors;
  }
}

// One place that turns any backend response into data or a typed error
export async function parseApiResponse<T>(res: Response): Promise<T> {
  const json = (await res.json().catch(() => null)) as ApiResult<T> | null;
  if (!json) throw new ApiRequestError("Server is unavailable, please try again", res.status);
  if (!json.success) throw new ApiRequestError(json.message, res.status, json.errors);
  return json.data;
}