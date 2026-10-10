"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUrlState } from "@/hooks/use-url-state";
import type { PageMeta } from "@/types";

export function Pagination({ meta }: { meta: PageMeta }) {
  const { update } = useUrlState();
  if (meta.totalPages <= 1) return null;

  const goTo = (page: number) => update({ page: page === 1 ? undefined : page }, { resetPage: false });

  return (
    <nav className="flex items-center justify-between gap-4" aria-label="Pagination">
      <p className="text-sm text-muted-foreground">
        Page {meta.page} of {meta.totalPages}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={meta.page <= 1} onClick={() => goTo(meta.page - 1)}>
          <ChevronLeft /> Previous
        </Button>
        <Button variant="outline" size="sm" disabled={meta.page >= meta.totalPages} onClick={() => goTo(meta.page + 1)}>
          Next <ChevronRight />
        </Button>
      </div>
    </nav>
  );
}