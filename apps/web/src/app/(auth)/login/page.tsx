import { Container } from "@/components/site/Container";
import { LoginForm } from "./ui";

export default function LoginPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto w-full max-w-md rounded-xl border border-black/10 bg-surface p-6 shadow-sm">
        <h1 className="font-display text-2xl tracking-tight text-primary">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Access your customer portal to view quotes, projects, and documents.
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </Container>
  );
}

