import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

type Props = { params: Promise<{ city: string }> };

function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props) {
  const { city } = await params;
  return {
    title: `Insulation in ${titleCaseFromSlug(city)}`,
  };
}

export default async function CityServiceAreaPage({ params }: Props) {
  const { city } = await params;
  const cityName = titleCaseFromSlug(city);

  return (
    <Container className="py-16">
      <div className="max-w-3xl">
        <Link className="text-sm font-semibold text-primary/70 hover:text-primary" href="/service-area">
          ← Back to service area
        </Link>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-primary">
          Insulation in {cityName}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-primary/75">
          Local guidance for homes and buildings in {cityName}. We’ll recommend
          materials and strategies that fit your structure and the Sierra
          climate.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { title: "Attics", body: "Blown-in, radiant barrier, ventilation checks." },
          { title: "Crawlspaces", body: "Moisture-aware insulation and air sealing." },
          { title: "Walls", body: "Batt options and leakage reduction." },
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

