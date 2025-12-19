"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/cn";
import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/Button";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/service-area", label: "Service Area" },
  { href: "/resources", label: "Resources" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className={cn("sticky top-0 z-40 border-b border-black/10 shadow-sm", className)}>
      <div className="bg-background/95 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Mountain Insulation"
                width={140}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-primary/80 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-md border border-black/10 bg-surface px-3 text-sm font-semibold text-primary hover:bg-primary/5 md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              Menu
            </button>
            <Link href="/quote" className="hidden sm:inline-flex">
              <Button size="sm" variant="primary">
                Get a Quote
              </Button>
            </Link>
            <Link href="/portal" className="hidden sm:inline-flex">
              <Button size="sm" variant="ghost">
                Customer Portal
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      {mobileOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          className="md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="fixed inset-x-3 top-3 rounded-xl border border-black/10 bg-background shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
              <Image
                src="/logo.png"
                alt="Mountain Insulation"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <button
                type="button"
                className="rounded-md px-2 py-1 text-sm font-semibold text-primary/80 hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                Close
              </button>
            </div>
            <nav className="flex flex-col px-4 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-primary/80 hover:bg-primary/5 hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-black/10 pt-3">
                <Link href="/quote" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" variant="primary">
                    Get a Quote
                  </Button>
                </Link>
                <Link href="/portal" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" variant="ghost">
                    Customer Portal
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}

