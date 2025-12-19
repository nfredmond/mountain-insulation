import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl tracking-tight text-primary">
        Resources
      </h1>
      <p className="mt-4 max-w-2xl text-base text-primary/75">
        Helpful guides on insulation, comfort, and energy efficiency.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "How to know if your attic needs insulation", slug: "attic-needs-insulation" },
          { title: "Air sealing vs insulation: what matters most?", slug: "air-sealing-vs-insulation" },
          { title: "Spray foam: when it’s the right tool", slug: "spray-foam-when" },
        ].map((post) => (
          <Link key={post.slug} href={`/resources/${post.slug}`}>
            <Card className="h-full p-5 transition-colors hover:bg-primary/5">
              <div className="text-sm font-semibold text-primary">{post.title}</div>
              <div className="mt-2 text-sm text-primary/70">Read the guide →</div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}

