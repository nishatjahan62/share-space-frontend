
import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Handshake,
  Scale,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description:
    "ShareSpace makes shared housing simpler and fairer for property owners and tenants.",
  openGraph: {
    title: "About | ShareSpace",
    description: "Shared housing, made simpler and fairer.",
  },
};

const AUDIENCES = [
  {
    icon: UserRound,
    title: "For tenants",
    points: [
      "Search rooms by city, rent and keyword",
      "Get matched with compatible roommates",
      "Request viewings and apply online",
      "Pay rent by card and split utility bills",
      "Report maintenance issues and follow progress",
    ],
  },
  {
    icon: Building2,
    title: "For owners",
    points: [
      "Publish properties and manage room availability",
      "Review viewing requests and applications",
      "Approve tenants without risk of overbooking",
      "Track rent payments and earnings",
      "Handle maintenance requests in one place",
    ],
  },
];

const PRINCIPLES = [
  {
    icon: Handshake,
    title: "Transparent",
    text: "Rent, availability and request status are always visible to everyone involved.",
  },
  {
    icon: Scale,
    title: "Fair",
    text: "Bills are split equally and rooms are never booked beyond their capacity.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    text: "Role-based access, hashed passwords and Stripe-hosted payments protect your data.",
  },
];

export default function AboutPage() {
  return (
    <Container className="space-y-12 py-10">
      <PageHeader
        title="Shared housing, made simpler"
        description="ShareSpace connects property owners and tenants through one clear, trustworthy workflow."
      />

      <section className="max-w-3xl space-y-4 text-muted-foreground">
        <p>
          Finding a room usually means juggling chat groups, spreadsheets and
          cash payments. ShareSpace replaces that with a single platform:
          owners publish rooms, tenants search and get matched with compatible
          roommates, and every step from viewing to move-in is tracked.
        </p>

        <p>
          Once someone moves in, the same platform handles monthly rent,
          shared utility bills and maintenance requests, so nobody has to
          chase anybody.
        </p>
      </section>

      <section
        className="grid gap-6 md:grid-cols-2"
        aria-label="Who ShareSpace is for"
      >
        {AUDIENCES.map(({ icon: Icon, title, points }) => (
          <Card key={title}>
            <CardHeader>
              <div
                className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                aria-hidden="true"
              >
                <Icon className="size-5" />
              </div>

              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>

      <section
        className="space-y-6"
        aria-labelledby="principles-heading"
      >
        <h2
          id="principles-heading"
          className="text-2xl font-bold tracking-tight"
        >
          What we believe in
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <CardHeader>
                <Icon
                  className="mb-2 size-6 text-primary"
                  aria-hidden="true"
                />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/properties"
          className={buttonVariants()}
        >
          Browse rooms
        </Link>

        <Link
          href="/contact"
          className={buttonVariants({ variant: "outline" })}
        >
          Get in touch
        </Link>
      </div>
    </Container>
  );
}
