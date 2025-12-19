import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";

type Props = { params: Promise<{ slug: string }> };

const fallback: Record<string, { title: string; summary: string }> = {
  "attic-upgrade-grass-valley": {
    title: "Attic upgrade — Grass Valley",
    summary: "Blown-in upgrade + targeted air sealing for comfort and efficiency.",
  },
  "crawlspace-comfort-nevada-city": {
    title: "Crawlspace comfort — Nevada City",
    summary: "Moisture-aware crawlspace insulation to warm floors and stabilize temps.",
  },
  "walls-air-seal-penn-valley": {
    title: "Walls + air seal — Penn Valley",
    summary: "Wall insulation improvements paired with air leakage reduction.",
  },
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = fallback[slug];
  if (!project) notFound();

  return (
    <Container className="py-16">
      <div className="max-w-3xl">
        <Link className="text-sm font-semibold text-primary/70 hover:text-primary" href="/projects">
          ← Back to projects
        </Link>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-primary">
          {project.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-primary/75">
          {project.summary}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { title: "Scope", body: "Assessment, recommended materials, and install plan." },
          { title: "Install", body: "Clean jobsite, careful prep, and quality checks." },
          { title: "Result", body: "Better comfort, fewer drafts, and improved efficiency." },
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

