import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";

type Props = { params: Promise<{ slug: string }> };

const fallback: Record<string, { title: string; summary: string }> = {
  "blown-in": {
    title: "Blown-in Insulation",
    summary:
      "Fast coverage for attics and hard-to-reach cavities—great for improving comfort and lowering energy use.",
  },
  "batt": {
    title: "Batt Insulation",
    summary:
      "A reliable, cost-effective choice for many wall and floor assemblies when installed with care.",
  },
  "spray-foam": {
    title: "Spray Foam Insulation",
    summary:
      "High-performance insulation + air sealing in one—ideal where maximum control of drafts and moisture matters.",
  },
  "radiant-barrier": {
    title: "Radiant Barriers",
    summary:
      "Reduce radiant heat transfer—helpful in attic applications to keep your home cooler in summer.",
  },
  "air-sealing": {
    title: "Air Sealing",
    summary:
      "The hidden MVP—targeted sealing to reduce drafts, allergens, and wasted conditioned air.",
  },
  "crawlspace": {
    title: "Crawlspace Insulation",
    summary:
      "Warmer floors and improved moisture control, tailored to your crawlspace conditions.",
  },
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = fallback[slug];
  if (!service) notFound();

  return (
    <Container className="py-16">
      <div className="max-w-3xl">
        <Link className="text-sm font-semibold text-primary/70 hover:text-primary" href="/services">
          ← Back to services
        </Link>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-primary">
          {service.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-primary/75">
          {service.summary}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "What we evaluate",
            body: "Access, existing insulation, ventilation, and the biggest leakage points.",
          },
          {
            title: "What you can expect",
            body: "Clear scope, clean jobsite, and documented recommendations.",
          },
          {
            title: "Next step",
            body: "Submit a quote request and we’ll schedule a walkthrough or call.",
          },
        ].map((item) => (
          <Card key={item.title} className="p-5">
            <div className="text-sm font-semibold text-primary">{item.title}</div>
            <div className="mt-2 text-sm text-primary/70">{item.body}</div>
          </Card>
        ))}
      </div>
    </Container>
  );
}

