import { Container } from "@/components/site/Container";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "FAQ",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "How do I know what insulation I need?",
      a: "We evaluate the current insulation, leakage points, access, and goals (comfort, bills, moisture control) to recommend the best approach.",
    },
    {
      q: "Do you offer free estimates?",
      a: "We’ll start with your quote request details. Many projects can be ballparked remotely; some need a walkthrough.",
    },
    {
      q: "How long does an install take?",
      a: "Many attic upgrades are done in a day. Larger scopes vary—we’ll give a clear timeline up front.",
    },
  ];

  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl tracking-tight text-primary">FAQ</h1>
      <p className="mt-4 max-w-2xl text-base text-primary/75">
        Quick answers to common questions. (This will be CMS-driven.)
      </p>

      <div className="mt-10 space-y-3">
        {faqs.map((item) => (
          <Card key={item.q} className="p-5">
            <div className="text-sm font-semibold text-primary">{item.q}</div>
            <div className="mt-2 text-sm text-primary/70">{item.a}</div>
          </Card>
        ))}
      </div>
    </Container>
  );
}

