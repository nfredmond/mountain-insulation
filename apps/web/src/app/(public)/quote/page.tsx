import { Container } from "@/components/site/Container";
import { QuoteWizard } from "./ui";

export const metadata = {
  title: "Get a Quote",
};

export default function QuotePage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl tracking-tight text-primary">
          Get a Quote
        </h1>
        <p className="mt-4 text-base leading-relaxed text-primary/75">
          Answer a few quick questions and we’ll follow up with next steps.
        </p>
      </div>

      <div className="mt-10">
        <QuoteWizard />
      </div>
    </Container>
  );
}

