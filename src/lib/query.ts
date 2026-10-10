export type QueryParams = Record<string, string | number | undefined | null>;

export interface RequestOptions {
  method?: string;
  body?: unknown;
  query?: QueryParams;
}

export const buildQuery = (params?: QueryParams): string => {
  if (!params) return "";
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
};