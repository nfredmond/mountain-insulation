import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl tracking-tight text-primary">
          About Mountain Insulation
        </h1>
        <p className="mt-4 text-base leading-relaxed text-primary/75">
          We’re a Grass Valley-based insulation contractor focused on clean,
          professional installs and measurable comfort improvements. Our approach
          blends modern materials with detail-oriented craftsmanship.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Sierra Modern",
            body: "Rugged reliability with contemporary professionalism—clear comms, clean finishes.",
          },
          {
            title: "Comfort-first",
            body: "Draft reduction, balanced temps, and smart ventilation choices.",
          },
          {
            title: "Trust signals",
            body: "Licensing, insurance, certifications, and reviews—front and center.",
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

