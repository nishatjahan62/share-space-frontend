import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, DoorClosed, MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { RoomCard } from "@/components/property/room-card";
import { EmptyState } from "@/components/shared/empty-state";
import { apiFetch } from "@/lib/api";
import { ApiRequestError } from "@/lib/api-error";
import { getSession } from "@/lib/session";
import type { Property } from "@/types";

type Props = {
  params: Promise<{ id: string }>;
};

const getProperty = cache(async (id: string) => {
  try {
    return await apiFetch<Property>(`/properties/${id}`);
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 404) {
      notFound();
    }

    throw error;
  }
});

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);

  const description =
    property.description ??
    `${property.title} in ${property.city}. View rooms and apply on ShareSpace.`;

  return {
    title: property.title,
    description,
    openGraph: {
      title: property.title,
      description,
    },
  };
}

export default async function PropertyDetailsPage({ params }: Props) {
  const { id } = await params;

  const [property, user] = await Promise.all([
    getProperty(id),
    getSession(),
  ]);

  return (
    <Container className="space-y-8 py-10">
      <Link
        href="/properties"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to listings
      </Link>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {property.title}
        </h1>

        <p className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="size-4" aria-hidden />
          {property.address}, {property.city}
        </p>
      </header>

      {property.description && (
        <p className="max-w-3xl text-muted-foreground">
          {property.description}
        </p>
      )}

      <section aria-labelledby="rooms-heading" className="space-y-4">
        <h2 id="rooms-heading" className="text-xl font-semibold">
          Rooms
        </h2>

        {property.rooms.length === 0 ? (
          <EmptyState
            icon={<DoorClosed className="size-6" />}
            title="No rooms listed yet"
            description="The owner hasn't added any rooms to this property."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {property.rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                viewerRole={user?.role ?? null}
                redirectTo={`/properties/${property.id}`}
              />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}