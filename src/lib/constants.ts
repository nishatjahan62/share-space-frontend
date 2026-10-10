import type { Role } from "@/types";

export const COOKIE_ACCESS = "ss_access";
export const COOKIE_REFRESH = "ss_refresh";

export const ROLE_HOME: Record<Role, string> = {
  ADMIN: "/admin",
  OWNER: "/provider",
  TENANT: "/dashboard",
};

export const ROUTE_ROLES: { prefix: string; role: Role }[] = [
  { prefix: "/admin", role: "ADMIN" },
  { prefix: "/provider", role: "OWNER" },
  { prefix: "/dashboard", role: "TENANT" },
];

// Public demo accounts (created by the backend seed script)
export const DEMO_ACCOUNTS = [
  { role: "ADMIN" as const, label: "Admin", email: "admin@sharespace.com", password: "ShareSpace@Demo2026" },
  { role: "TENANT" as const, label: "User", email: "tenant1@sharespace.com", password: "password123" },
  { role: "OWNER" as const, label: "Provider", email: "owner@sharespace.com", password: "password123" },
];

export const ROLE_LABEL: Record<Role, string> = { ADMIN: "Admin", OWNER: "Owner", TENANT: "Tenant" };

export const ROLE_PROFILE: Record<Role, string> = {
  ADMIN: "/admin",
  OWNER: "/provider/profile",
  TENANT: "/dashboard/profile",
};


export const CONTACT_EMAIL = "support@sharespace.com";