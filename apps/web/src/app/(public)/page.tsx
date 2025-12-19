import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/Button";

const services = [
  {
    title: "Blown-in insulation",
    description: "Fast, efficient coverage for attics and hard-to-reach spaces.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Batt insulation",
    description: "Classic rolls for walls, floors, and new construction.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
      </svg>
    ),
  },
  {
    title: "Spray foam",
    description: "Premium air-sealing and maximum R-value per inch.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23.693L5 15.3m14.8 0 .21 1.264a2.25 2.25 0 0 1-1.545 2.604l-5.495 1.498a2.25 2.25 0 0 1-1.18 0l-5.495-1.498a2.25 2.25 0 0 1-1.545-2.604L5 15.3" />
      </svg>
    ),
  },
  {
    title: "Radiant barriers",
    description: "Reflect heat away and keep your home cooler in summer.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

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

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Background Image - positioned to show darker mountain areas */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/hero-mountains.jpg"
            alt=""
            fill
            priority
            className="object-cover object-bottom scale-110"
          />
        </div>

        {/* Strong gradient overlay for text readability */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/70 via-60% to-[var(--mi-neutral-light)]" />

        {/* Subtle accent glow */}
        <div className="absolute left-1/4 top-1/3 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <Container className="relative flex min-h-[90vh] flex-col justify-center py-20 sm:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
              Serving Grass Valley + Nevada County
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow" />
              Residential & Commercial
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up animation-delay-100 mt-8 font-display text-5xl leading-[1.05] tracking-tight text-white text-shadow-hero sm:text-7xl lg:text-8xl">
              Insulation that feels like a{" "}
              <span className="accent-underline text-accent">home upgrade</span>.
            </h1>

            {/* Subhead */}
            <p className="animate-fade-in-up animation-delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-white/80 text-shadow-sm sm:text-xl">
              Modern materials, meticulous installs, and clear communication.
              Reduce drafts, lower energy bills, and make every room more
              comfortable—year-round.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up animation-delay-300 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/quote">
                <Button size="lg" variant="primary" className="animate-glow shadow-lg shadow-accent/30">
                  Get a fast quote
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="ghost" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                  Explore services
                </Button>
              </Link>
            </div>

            {/* Stat Cards */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {[
                { label: "Target", value: "Energy savings" },
                { label: "Focus", value: "Comfort + air sealing" },
                { label: "Work", value: "Clean, professional installs" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`animate-fade-in-up animation-delay-${400 + i * 100} animate-float rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-md`}
                  style={{ animationDelay: `${400 + i * 100}ms, ${i * 0.5}s` }}
                >
                  <div className="font-mono text-xs uppercase tracking-wider text-white/50">
                    {stat.label}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===== WAVE DIVIDER ===== */}
      <div className="wave-divider bg-[var(--mi-neutral-light)]">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 80V40C240 80 480 0 720 20C960 40 1200 80 1440 40V80H0Z"
            fill="var(--mi-neutral-light)"
          />
        </svg>
      </div>

      {/* ===== SERVICES SECTION ===== */}
      <section className="bg-background">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Section Header */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                What we do
              </div>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-primary sm:text-4xl">
                Services built around your goals
              </h2>
              <p className="mt-4 text-base leading-relaxed text-primary/70">
                Attics, walls, crawlspaces, and more—customized for your home, climate, and budget.
              </p>
              <div className="mt-8">
                <Link href="/services">
                  <Button variant="secondary" className="group">
                    View all services
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Service Cards */}
            <div className="lg:col-span-2">
              <div className="grid gap-5 sm:grid-cols-2">
                {services.map((service, i) => (
                  <Link
                    key={service.title}
                    href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="service-card group rounded-2xl border border-black/5 bg-surface p-6 shadow-sm"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                      {service.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-primary/70">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== TRUST INDICATORS ===== */}
      <section className="border-t border-black/5 bg-surface">
        <Container className="py-16">
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "500+", label: "Projects Completed" },
              { number: "100%", label: "Licensed & Insured" },
              { number: "5★", label: "Google Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl text-secondary sm:text-4xl">
                  {stat.number}
                </div>
                <div className="mt-1 text-sm text-primary/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

