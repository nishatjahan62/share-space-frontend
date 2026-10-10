"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUrlState } from "@/hooks/use-url-state";

export function ClearFilters({ onClear }: { onClear?: () => void }) {
  const { searchParams, clear } = useUrlState();
  if (searchParams.toString() === "") return null;

  return (
    <Button
      variant="ghost"
      onClick={() => {
        clear();
        onClear?.();
      }}
    >
      <X /> Clear
    </Button>
  );
}