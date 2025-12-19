import { Container } from "@/components/site/Container";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl tracking-tight text-primary">
        Privacy Policy
      </h1>
      <p className="mt-4 max-w-3xl text-base text-primary/75">
        This is a placeholder policy. We’ll replace it with the final client
        policy before launch.
      </p>
    </Container>
  );
}

