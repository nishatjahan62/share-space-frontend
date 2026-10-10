"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Updates = Record<string, string | number | undefined | null>;

// Single source of truth for URL-synced filters, sorting, search and pagination
export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const update = useCallback(
    (updates: Updates, { resetPage = true } = {}) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") params.delete(key);
        else params.set(key, String(value));
      });
      if (resetPage && !("page" in updates)) params.delete("page");
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const clear = useCallback(() => router.push(pathname, { scroll: false }), [router, pathname]);

  return { searchParams, update, clear };
}