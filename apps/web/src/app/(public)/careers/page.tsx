import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Careers",
};

export default function CareersPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl tracking-tight text-primary">
        Careers
      </h1>
      <p className="mt-4 max-w-2xl text-base text-primary/75">
        Interested in joining the team? Check back soon for openings.
      </p>

      <div className="mt-10">
        <Card className="p-6">
          <div className="text-sm font-semibold text-primary">
            No roles posted yet.
          </div>
          <div className="mt-2 text-sm text-primary/70">
            Send a note via the contact page with your experience and the type
            of work you’re looking for.
          </div>
        </Card>
      </div>
    </Container>
  );
}

