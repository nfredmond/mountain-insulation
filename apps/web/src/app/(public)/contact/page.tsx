import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl tracking-tight text-primary">
        Contact
      </h1>
      <p className="mt-4 max-w-2xl text-base text-primary/75">
        Prefer a quick quote? Use the quote wizard. For general questions, reach
        out here.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-sm font-semibold text-primary">Call</div>
          <div className="mt-2 text-base text-primary/80">(###) ###-####</div>

          <div className="mt-5 text-sm font-semibold text-primary">Email</div>
          <div className="mt-2 text-base text-primary/80">
            hello@mountaininsulation.com
          </div>

          <div className="mt-6">
            <a href="/quote">
              <Button>Get a Quote</Button>
            </a>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-semibold text-primary">
            Contact form (coming next)
          </div>
          <p className="mt-2 text-sm text-primary/70">
            We’ll wire this to Supabase + email notifications.
          </p>
        </Card>
      </div>
    </Container>
  );
}

