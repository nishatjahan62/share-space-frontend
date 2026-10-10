import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Brand } from "@/components/layout/brand";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserMenu } from "@/components/layout/user-menu";
import { PUBLIC_LINKS } from "@/lib/nav";
import { getSession } from "@/lib/session";

export async function SiteHeader() {
  const user = await getSession();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Brand />

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {PUBLIC_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link href="/login" className="hidden sm:inline-flex">
                <Button variant="ghost">Login</Button>
              </Link>

              <Link href="/register">
                <Button>Get started</Button>
              </Link>
            </>
          )}

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}