import { Suspense } from "react";
import { Container } from "@/components/site/Container";
import { LoginForm } from "./ui";
import Link from "next/link";

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
          <Suspense fallback={<div className="h-48 animate-pulse rounded bg-primary/5" />}>
            <LoginForm />
          </Suspense>
        </div>

        <div className="mt-4 text-center text-sm text-primary/70">
          New here?{" "}
          <Link className="font-semibold underline underline-offset-4" href="/signup">
            Create an account
          </Link>
        </div>
      </div>
    </Container>
  );
}

