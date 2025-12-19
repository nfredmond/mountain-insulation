import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Reviews",
};

export default function ReviewsPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl tracking-tight text-primary">
        Reviews
      </h1>
      <p className="mt-4 max-w-2xl text-base text-primary/75">
        Social proof and customer feedback. (We’ll integrate Google reviews as a
        later step.)
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { name: "Customer", quote: "Clean work and a noticeably warmer house." },
          { name: "Customer", quote: "Great communication and professional install." },
          { name: "Customer", quote: "Energy bills dropped and rooms feel consistent." },
        ].map((r, idx) => (
          <Card key={idx} className="p-5">
            <div className="text-sm font-semibold text-primary">{r.name}</div>
            <div className="mt-2 text-sm text-primary/70">“{r.quote}”</div>
          </Card>
        ))}
      </div>
    </Container>
  );
}

