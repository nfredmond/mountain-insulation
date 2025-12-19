import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl tracking-tight text-primary">
        Projects
      </h1>
      <p className="mt-4 max-w-2xl text-base text-primary/75">
        A few example installs and upgrades. (This will be driven by Payload CMS
        content shortly.)
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Attic upgrade — Grass Valley", slug: "attic-upgrade-grass-valley" },
          { title: "Crawlspace comfort — Nevada City", slug: "crawlspace-comfort-nevada-city" },
          { title: "Walls + air seal — Penn Valley", slug: "walls-air-seal-penn-valley" },
        ].map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`}>
            <Card className="h-full p-5 transition-colors hover:bg-primary/5">
              <div className="text-sm font-semibold text-primary">{p.title}</div>
              <div className="mt-2 text-sm text-primary/70">
                Before/after, scope, and results.
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}

