"use client";

import { Building2, Loader2, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/use-auth";
import { DEMO_ACCOUNTS } from "@/lib/constants";

const ICONS = { ADMIN: ShieldCheck, TENANT: UserRound, OWNER: Building2 } as const;
const DESCRIPTIONS = {
  ADMIN: "Analytics, users and audit logs",
  TENANT: "Search, apply and pay rent",
  OWNER: "Listings, applications, earnings",
} as const;

export function DemoLogin() {
  const login = useLogin();

  return (
    <section aria-labelledby="demo-heading" className="space-y-3">
      <h2 id="demo-heading" className="text-center text-sm font-medium">
        🚀 Quick Demo Login
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {DEMO_ACCOUNTS.map(({ role, label, email, password }) => {
          const Icon = ICONS[role];
          const pending = login.isPending && login.variables?.email === email;
          return (
            <Button
              key={role}
              type="button"
              variant="outline"
              className="h-auto flex-col gap-1 py-4"
              disabled={login.isPending}
              onClick={() => login.mutate({ email, password })}
            >
              {pending ? <Loader2 className="size-5 animate-spin" /> : <Icon className="size-5" />}
              <span className="font-medium">{label}</span>
              <span className="whitespace-normal text-center text-xs font-normal text-muted-foreground">
                {DESCRIPTIONS[role]}
              </span>
              <span className="text-xs text-primary">Demo Login</span>
            </Button>
          );
        })}
      </div>
    </section>
  );
}