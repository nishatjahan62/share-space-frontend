import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function AuthCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}

export function OrDivider() {
  return (
    <div className="relative" role="separator">
      <div className="absolute inset-0 flex items-center">
        <Separator />
      </div>
      <p className="relative mx-auto w-fit bg-card px-2 text-xs uppercase text-muted-foreground">or</p>
    </div>
  );
}