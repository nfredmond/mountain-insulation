import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const metadata = {
  title: "Service Area",
};

const cities = [
  "Grass Valley",
  "Nevada City",
  "Penn Valley",
  "Lake of the Pines",
  "Alta Sierra",
  "Colfax",
  "Auburn",
];

function slugifyCity(city: string) {
  return city.toLowerCase().replace(/\s+/g, "-");
}

export default function ServiceAreaPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl tracking-tight text-primary">
        Service Area
      </h1>
      <p className="mt-4 max-w-2xl text-base text-primary/75">
        We serve Grass Valley and the greater Nevada County / Sierra Foothills
        region.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <Link key={city} href={`/service-area/${slugifyCity(city)}`}>
            <Card className="p-5 transition-colors hover:bg-primary/5">
              <div className="text-sm font-semibold text-primary">{city}</div>
              <div className="mt-2 text-sm text-primary/70">
                Local insulation services and FAQs.
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}

