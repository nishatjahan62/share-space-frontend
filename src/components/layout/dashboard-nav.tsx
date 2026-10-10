"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROLE_HOME } from "@/lib/constants";
import { NAV_BY_ROLE } from "@/lib/nav";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

interface DashboardNavProps {
  role: Role;
  className?: string;
  onNavigate?: () => void;
}

export function DashboardNav({ role, className, onNavigate }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className={cn("flex flex-col gap-1", className)}>
      {NAV_BY_ROLE[role].map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== ROLE_HOME[role] && pathname.startsWith(`${href}/`));
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}