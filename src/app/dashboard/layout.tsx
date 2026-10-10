import type { ReactNode } from "react";
import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = { robots: { index: false } };

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role="TENANT">{children}</DashboardShell>;
}