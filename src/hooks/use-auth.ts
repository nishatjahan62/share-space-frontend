"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authRequest } from "@/lib/auth-client";
import { ROLE_HOME } from "@/lib/constants";
import type { LoginInput, RegisterPayload } from "@/lib/schemas";
import type { Role } from "@/types";

type AuthPath = "/api/auth/login" | "/api/auth/register";

// Shared by login, demo login and register: authenticate, toast, redirect by role
function useAuthMutation<TInput>(path: AuthPath, successMessage: string) {
  const router = useRouter();
  const from = useSearchParams().get("from");
  const safeFrom = from && from.startsWith("/") && !from.startsWith("//") ? from : null;

  return useMutation({
    mutationFn: (input: TInput) => authRequest<{ role: Role }>(path, input),
    onSuccess: ({ role }) => {
      toast.success(successMessage);
      router.replace(safeFrom ?? ROLE_HOME[role]);
      router.refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export const useLogin = () => useAuthMutation<LoginInput>("/api/auth/login", "Welcome back!");
export const useRegister = () => useAuthMutation<RegisterPayload>("/api/auth/register", "Account created. Welcome to ShareSpace!");