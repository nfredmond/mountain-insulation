import { Container } from "@/components/site/Container";

export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl tracking-tight text-primary">
        Terms of Service
      </h1>
      <p className="mt-4 max-w-3xl text-base text-primary/75">
        This is a placeholder terms page. We’ll replace it with final terms
        before launch.
      </p>
    </Container>
  );
}

