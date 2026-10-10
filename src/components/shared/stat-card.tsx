import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  hint?: string;
}

export function StatCard({ title, value, icon, hint }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        {icon && (
          <div className="rounded-lg bg-primary/10 p-2 text-primary" aria-hidden>
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  );
}