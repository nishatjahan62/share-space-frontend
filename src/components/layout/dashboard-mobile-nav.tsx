"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DashboardNav } from "@/components/layout/dashboard-nav";
import type { Role } from "@/types";

export function DashboardMobileNav({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle>ShareSpace</SheetTitle>
        </SheetHeader>

        <DashboardNav
          role={role}
          className="px-4"
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}