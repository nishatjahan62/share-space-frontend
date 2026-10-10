
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  KeyRound,
  Receipt,
  Search,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyGridSkeleton } from "@/components/property/property-grid-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import type { Paginated, Property } from "@/types";

export const metadata: Metadata = {
  title: {
    absolute: "ShareSpace | Find rooms and compatible roommates",
  },
  description:
    "Search verified rooms, match with compatible roommates, book viewings, apply and pay rent online, all in one place.",
};

const FLOW = [
  {
    icon: Search,
    title: "Search",
    text: "Filter rooms by city, rent and keyword.",
  },
  {
    icon: CalendarCheck,
    title: "Book a viewing",
    text: "Pick a time that suits you and the owner.",
  },
  {
    icon: ClipboardCheck,
    title: "Apply",
    text: "Send your move-in date and a short note.",
  },
  {
    icon: KeyRound,
    title: "Move in and pay",
    text: "Pay rent securely by card, online.",
  },
];

const FEATURES = [
  {
    icon: Users,
    title: "Roommate matching",
    text: "Compatibility is scored on budget, city and lifestyle, so you meet people who fit.",
  },
  {
    icon: ShieldCheck,
    title: "Verified owners",
    text: "Admins verify owner accounts so you know who you are dealing with.",
  },
  {
    icon: CalendarCheck,
    title: "Viewing requests",
    text: "Request a viewing in seconds and track the owner's answer.",
  },
  {
    icon: CreditCard,
    title: "Secure rent payments",
    text: "Card payments run through Stripe and are confirmed before rent is marked paid.",
  },
  {
    icon: Receipt,
    title: "Fair bill splitting",
    text: "Utility bills are split automatically between everyone living in the room.",
  },
  {
    icon: Wrench,
    title: "Maintenance tracking",
    text: "Report an issue and follow it from open to resolved.",
  },
];

async function FeaturedListings() {
  const result = await apiFetch<Paginated<Property>>("/properties", {
    query: { limit: 3 },
  }).catch(() => null);

  if (!result || result.items.length === 0) {
    return (
      <EmptyState
        title="No listings yet"
        description="New properties appear here as soon as owners publish them."
        action={
          <Link
            href="/register"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            List your property
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {result.items.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Badge variant="secondary">
              Rooms · Roommates · Rent in one place
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Find a room, and the right people to share it with
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground">
              ShareSpace matches you with listings and compatible roommates,
              then handles viewings, applications and rent payments in one
              secure workflow.
            </p>

            <form
              action="/properties"
              role="search"
              className="flex max-w-xl gap-2"
            >
              <Input
                name="q"
                placeholder="Search by city, area or property name"
                aria-label="Search properties"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Search
              </button>
            </form>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[
                "Free to browse",
                "Real owner verification",
                "Card payments via Stripe",
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
              <CardDescription>
                From first search to your front door in four steps.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ol className="space-y-5">
                {FLOW.map(({ icon: Icon, title, text }, index) => (
                  <li key={title} className="flex gap-4">
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" />
                    </div>

                    <div>
                      <p className="font-medium">
                        {index + 1}. {title}
                      </p>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything a shared home needs
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From finding a room to fixing a leaking tap, ShareSpace keeps
              owners and tenants on the same page.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <CardHeader>
                  <div
                    className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </div>

                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y bg-muted/30 py-16">
        <Container className="space-y-8">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight">
                Latest listings
              </h2>
              <p className="text-muted-foreground">
                Freshly published properties from our owners.
              </p>
            </div>

            <Link
              href="/properties"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View all
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <Suspense fallback={<PropertyGridSkeleton />}>
            <FeaturedListings />
          </Suspense>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">
                  Ready to get started?
                </h2>
                <p className="text-primary-foreground/80">
                  Create a free account as a tenant or list your property as
                  an owner.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  Create account
                </Link>

                <Link
                  href="/properties"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground/40 bg-transparent px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  Browse rooms
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}
