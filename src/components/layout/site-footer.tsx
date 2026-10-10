import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Brand } from "@/components/layout/brand";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/properties", label: "Browse rooms" },
      { href: "/faq", label: "FAQ" },
      { href: "/about", label: "About us" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Login" },
      { href: "/register", label: "Create account" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <Container className="grid gap-8 py-10 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-3">
          <Brand />
          <p className="max-w-sm text-sm text-muted-foreground">
            Find rooms, match with compatible roommates, and manage viewings, applications and rent in one place.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title} className="space-y-3">
            <h2 className="text-sm font-semibold">{column.title}</h2>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ShareSpace. All rights reserved.
      </div>
    </footer>
  );
}