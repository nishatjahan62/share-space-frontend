import Link from "next/link";
import { Building2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { Property } from "@/types";

export function PropertyCard({ property }: { property: Property }) {
  const rents = property.rooms.map((room) => room.rentAmount);
  const available = property.rooms.filter(
    (room) => room.status === "AVAILABLE"
  ).length;

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="h-full overflow-hidden pt-0 transition-shadow group-hover:shadow-md">
        <div
          className="flex h-36 items-center justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-muted"
          aria-hidden
        >
          <Building2 className="size-10 text-primary/60" />
        </div>

        <CardContent className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-semibold">
              {property.title}
            </h3>

            <Badge
              variant={available > 0 ? "default" : "secondary"}
              className="shrink-0"
            >
              {available > 0 ? `${available} available` : "Full"}
            </Badge>
          </div>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" aria-hidden />
            <span className="line-clamp-1">
              {property.address}, {property.city}
            </span>
          </p>

          {rents.length > 0 ? (
            <p className="text-sm">
              <span className="text-muted-foreground">From </span>
              <span className="text-lg font-semibold">
                {formatCurrency(Math.min(...rents))}
              </span>
              <span className="text-muted-foreground"> / month</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              No rooms listed yet
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}