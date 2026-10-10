"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ClearFilters } from "@/components/shared/clear-filters";
import { SearchInput } from "@/components/shared/search-input";
import { SelectFilter } from "@/components/shared/select-filter";

const SORT_OPTIONS = [
  { value: "createdAt", label: "Newest first" },
  { value: "title", label: "Title (A–Z)" },
];

export function PropertyFilters() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div
      key={resetKey}
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]"
    >
      <SearchInput
        param="q"
        placeholder="Search title, area or city"
        icon={<Search className="size-4" />}
      />

      <SearchInput param="city" type="text" placeholder="City" />

      <SearchInput param="minRent" type="number" placeholder="Min rent" />

      <SearchInput param="maxRent" type="number" placeholder="Max rent" />

      <SelectFilter
        param="sortBy"
        label="Sort by"
        defaultValue="createdAt"
        options={SORT_OPTIONS}
      />

      <ClearFilters onClear={() => setResetKey((key) => key + 1)} />
    </div>
  );
}