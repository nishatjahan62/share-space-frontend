import type { Role } from "@/types";

// Decodes only (no signature check). Used for fast redirects; the backend enforces real authorization.
export function decodeRole(token?: string): Role | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1] ?? "", "base64url").toString("utf8"));
    if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) return null;
    return payload.role ?? null;
  } catch {
    return null;
  }
}