import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchX } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyFilters } from "@/components/property/property-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { apiFetch } from "@/lib/api";
import { readParams, type SearchParams } from "@/lib/search-params";
import type { Paginated, Property } from "@/types";

export const metadata: Metadata = {
  title: "Browse rooms",
  description:
    "Search shared rooms and flats by city, rent and keyword. Filter, sort and bookmark any view.",
  openGraph: {
    title: "Browse rooms | ShareSpace",
    description:
      "Search shared rooms and flats by city, rent and keyword.",
  },
};

const PARAM_KEYS = [
  "page",
  "q",
  "city",
  "minRent",
  "maxRent",
  "sortBy",
] as const;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await readParams(searchParams, PARAM_KEYS);

  const { items, meta } = await apiFetch<Paginated<Property>>(
    "/properties",
    {
      query: { ...params, limit: 9 },
    }
  );

  return (
    <Container className="space-y-8 py-10">
      <PageHeader
        title="Browse rooms"
        description="Find a place that fits your budget and your city."
      />

      <Suspense>
        <PropertyFilters />
      </Suspense>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {meta.total} {meta.total === 1 ? "property" : "properties"} found
      </p>

      {items.length === 0 ? (
        <EmptyState
          icon={<SearchX className="size-6" />}
          title="No properties match your filters"
          description="Try a different keyword, widen your rent range, or clear the filters."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      <Suspense>
        <Pagination meta={meta} />
      </Suspense>
    </Container>
  );
}