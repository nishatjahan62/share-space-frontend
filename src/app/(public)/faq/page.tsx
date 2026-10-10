
import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";


export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about roommate matching, viewings, applications, rent payments and bill splitting on ShareSpace.",
  openGraph: {
    title: "FAQ | ShareSpace",
    description:
      "Answers about viewings, applications, payments and more.",
  },
};

const FAQS = [
  {
    q: "Who can use ShareSpace?",
    a: "Anyone can browse listings. To request viewings, apply or pay rent you register as a tenant; to publish properties you register as an owner. Admins review and verify owner accounts.",
  },
  {
    q: "How does roommate matching work?",
    a: "Create a roommate profile with your budget, preferred city and lifestyle tags. We score other tenants on budget overlap, a shared city and common tags, then show the best matches first.",
  },
  {
    q: "How do I request a viewing?",
    a: "Open a property, choose a room and press Request viewing. Pick a date and time, and the owner confirms or declines. You can follow the status from your dashboard.",
  },
  {
    q: "How do I apply for a room?",
    a: "Press Apply for this room, choose your move-in date and add an optional message. When the owner approves, a tenancy and your first rent payment are created automatically.",
  },
  {
    q: "Can a room be overbooked?",
    a: "No. Each room has a capacity, and approvals are processed as a single database transaction, so two owners or two requests can never fill the same last spot.",
  },
  {
    q: "How do I pay rent?",
    a: "Open Payments in your dashboard and pay by card through Stripe Checkout. Your rent is marked as paid only after Stripe confirms the payment.",
  },
  {
    q: "Are my card details stored on ShareSpace?",
    a: "No. Card details are entered on Stripe's hosted payment page and never reach our servers.",
  },
  {
    q: "How are utility bills split?",
    a: "Owners add a bill for a room and it is divided equally between everyone with an active tenancy there. Each tenant sees and pays their own share.",
  },
  {
    q: "How do I report a maintenance problem?",
    a: "Go to Maintenance in your dashboard, describe the issue and set a priority. The owner updates the status from open to in progress to resolved.",
  },
];

export default function FaqPage() {
  return (
    <Container className="max-w-3xl space-y-8 py-10">
      <PageHeader
        title="Frequently asked questions"
        description="Quick answers about how ShareSpace works."
      />

    
<div className="w-full divide-y rounded-lg border">
  {FAQS.map((item, index) => (
    <details
      key={item.q}
      className="group px-5"
      open={index === 0}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium [&::-webkit-details-marker]:hidden">
        {item.q}

        <span className="text-xl text-muted-foreground transition-transform group-open:rotate-45">
          +
        </span>
      </summary>

      <div className="pb-5 text-sm leading-6 text-muted-foreground">
        {item.a}
      </div>
    </details>
  ))}
</div>

    </Container>
  );
}
