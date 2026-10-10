import type { ReactNode } from "react";
import { Brand } from "@/components/layout/brand";
import { DashboardMobileNav } from "@/components/layout/dashboard-mobile-nav";
import { DashboardNav } from "@/components/layout/dashboard-nav";
import { UserMenu } from "@/components/layout/user-menu";
import { ROLE_LABEL } from "@/lib/constants";
import { requireRole } from "@/lib/session";
import type { Role } from "@/types";

// Verifies the session with the backend, then renders the sidebar + topbar for the role
export async function DashboardShell({ role, children }: { role: Role; children: ReactNode }) {
  const user = await requireRole(role);

  return (
    <div className="min-h-screen bg-muted/30 md:grid md:grid-cols-[16rem_1fr]">
      <aside className="hidden border-r bg-background md:block">
        <div className="flex h-16 items-center border-b px-6">
          <Brand />
        </div>
        <DashboardNav role={role} className="p-4" />
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-8">
          <DashboardMobileNav role={role} />
          <p className="hidden text-sm text-muted-foreground md:block">{ROLE_LABEL[role]} workspace</p>
          <UserMenu user={user} />
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}