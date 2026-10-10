"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const router = useRouter();

  return async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("You have been logged out");
    router.push("/login");
    router.refresh();
  };
}