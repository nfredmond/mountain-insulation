import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl tracking-tight text-primary">
        Services
      </h1>
      <p className="mt-4 max-w-2xl text-base text-primary/75">
        Built for comfort and efficiency in the Sierra Foothills—attics, walls,
        crawlspaces, and more.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Blown-in insulation", slug: "blown-in" },
          { title: "Batt insulation", slug: "batt" },
          { title: "Spray foam insulation", slug: "spray-foam" },
          { title: "Radiant barriers", slug: "radiant-barrier" },
          { title: "Air sealing", slug: "air-sealing" },
          { title: "Crawlspace insulation", slug: "crawlspace" },
        ].map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`}>
            <Card className="h-full p-5 transition-colors hover:bg-primary/5">
              <div className="text-sm font-semibold text-primary">{s.title}</div>
              <div className="mt-2 text-sm text-primary/70">
                Details, best-fit scenarios, and what to expect.
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}

