import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/site/Container";

type Props = { params: { slug: string } };

const fallback = {
  "attic-needs-insulation": {
    title: "How to know if your attic needs insulation",
    body: "Look for uneven temperatures, high energy bills, visible insulation gaps, and drafts. A walkthrough can confirm depth, coverage, and ventilation.",
  },
  "air-sealing-vs-insulation": {
    title: "Air sealing vs insulation: what matters most?",
    body: "In many homes, targeted air sealing is the fastest comfort win. Insulation works best after key leakage points are addressed.",
  },
  "spray-foam-when": {
    title: "Spray foam: when it’s the right tool",
    body: "Spray foam shines in tricky assemblies, rim joists, and where air control is critical—but it’s not always necessary. We’ll recommend the right approach.",
  },
} satisfies Record<string, { title: string; body: string }>;

export default function ResourceDetailPage({ params }: Props) {
  const post = fallback[params.slug];
  if (!post) notFound();

  return (
    <Container className="py-16">
      <Link className="text-sm font-semibold text-primary/70 hover:text-primary" href="/resources">
        ← Back to resources
      </Link>
      <h1 className="mt-4 font-display text-4xl tracking-tight text-primary">
        {post.title}
      </h1>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-primary/75">
        {post.body}
      </p>
    </Container>
  );
}

