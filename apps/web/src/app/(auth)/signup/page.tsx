import { Container } from "@/components/site/Container";
import { SignupForm } from "./ui";

export const metadata = {
  title: "Create account",
};

export default function SignupPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto w-full max-w-md rounded-xl border border-black/10 bg-surface p-6 shadow-sm">
        <h1 className="font-display text-2xl tracking-tight text-primary">
          Create account
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Create a customer portal account to track quotes, projects, and
          documents.
        </p>

        <div className="mt-6">
          <SignupForm />
        </div>
      </div>
    </Container>
  );
}

