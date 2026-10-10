import type { ReactNode } from "react";
import { Brand } from "@/components/layout/brand";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="mb-6">
        <Brand />
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}