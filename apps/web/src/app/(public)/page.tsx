import Link from "next/link";

import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Mountain Insulation",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Grass Valley",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: ["Grass Valley", "Nevada County", "Sierra Foothills"],
    url: siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_circle_at_20%_10%,color-mix(in_oklab,var(--color-accent)_20%,transparent),transparent_60%),radial-gradient(900px_circle_at_80%_0%,color-mix(in_oklab,var(--color-secondary)_18%,transparent),transparent_55%)]" />
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-surface/80 px-3 py-1 text-xs font-semibold text-primary/80">
              Serving Grass Valley + Nevada County
              <span className="h-1 w-1 rounded-full bg-accent" />
              Residential & Commercial
            </div>

            <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-primary sm:text-6xl">
              Insulation that feels like a home upgrade.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary/75 sm:text-lg">
              Modern materials, meticulous installs, and clear communication.
              Reduce drafts, lower energy bills, and make every room more
              comfortable—year-round.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/quote">
                <Button size="lg" variant="primary">
                  Get a fast quote
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="ghost">
                  Explore services
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div className="rounded-lg border border-black/10 bg-surface p-4">
                <div className="font-mono text-sm text-primary/60">Target</div>
                <div className="mt-1 text-sm font-semibold text-primary">
                  Energy savings
                </div>
              </div>
              <div className="rounded-lg border border-black/10 bg-surface p-4">
                <div className="font-mono text-sm text-primary/60">Focus</div>
                <div className="mt-1 text-sm font-semibold text-primary">
                  Comfort + air sealing
                </div>
              </div>
              <div className="rounded-lg border border-black/10 bg-surface p-4">
                <div className="font-mono text-sm text-primary/60">Work</div>
                <div className="mt-1 text-sm font-semibold text-primary">
                  Clean, professional installs
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-black/10">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h2 className="font-display text-2xl tracking-tight text-primary">
                Services
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-primary/75">
                Attics, walls, crawlspaces, and more—built around your goals and
                budget.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Blown-in insulation",
                  "Batt insulation",
                  "Spray foam",
                  "Radiant barriers",
                ].map((label) => (
                  <div
                    key={label}
                    className="rounded-lg border border-black/10 bg-surface p-5"
                  >
                    <div className="text-sm font-semibold text-primary">
                      {label}
                    </div>
                    <div className="mt-2 text-sm text-primary/70">
                      Learn what’s best for your home and climate.
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <Link href="/services">
                  <Button variant="secondary">View all services</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

