import Link from "next/link";

import { Container } from "@/components/site/Container";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="font-display text-base text-primary">
            Mountain Insulation
          </div>
          <div className="text-sm text-primary/70">
            Grass Valley, CA • Nevada County & Sierra Foothills
          </div>
          <div className="text-sm text-primary/70">
            <span className="font-semibold">Call:</span>{" "}
            <a className="underline decoration-black/20 underline-offset-4 hover:decoration-black/40" href="tel:+1">
              (###) ###-####
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-primary/70 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}

