
import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about ShareSpace? Send us a message and we'll get back to you.",
  openGraph: {
    title: "Contact | ShareSpace",
    description: "Questions about ShareSpace? Send us a message.",
  },
};

export default function ContactPage() {
  return (
    <Container className="space-y-8 py-10">
      <PageHeader
        title="Contact us"
        description="Questions, feedback or a problem with a listing? We'd love to hear from you."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-4">
          <Card>
            <CardContent className="flex items-start gap-3">
              <Mail
                className="mt-0.5 size-5 text-primary"
                aria-hidden="true"
              />

              <div>
                <p className="font-medium">Email</p>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 size-5 text-primary"
                aria-hidden="true"
              />

              <div>
                <p className="font-medium">Based in</p>
                <p className="text-sm text-muted-foreground">
                  Chattogram, Bangladesh
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
          </CardHeader>

          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
