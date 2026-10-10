"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_HOME, ROLE_LABEL, ROLE_PROFILE } from "@/lib/constants";
import { initials } from "@/lib/format";
import { useLogout } from "@/hooks/use-logout";
import type { User } from "@/types";

export function UserMenu({ user }: { user: User }) {
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="gap-2 px-2"
          aria-label="Open user menu"
        >
          <Avatar className="size-8">
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>
          <span className="hidden max-w-32 truncate text-sm sm:inline">
            {user.name}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="space-y-0.5">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">
            {user.email} · {ROLE_LABEL[user.role]}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            href={ROLE_HOME[user.role]}
            className="flex w-full items-center gap-2"
          >
            <LayoutDashboard />
            Dashboard
          </Link>
        </DropdownMenuItem>

        {user.role !== "ADMIN" && (
          <DropdownMenuItem>
            <Link
              href={ROLE_PROFILE[user.role]}
              className="flex w-full items-center gap-2"
            >
              <UserRound />
              Profile
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onSelect={logout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}