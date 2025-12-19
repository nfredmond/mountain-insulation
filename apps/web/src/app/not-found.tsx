import Link from "next/link";

import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="font-display text-4xl tracking-tight text-primary">
        Page not found
      </h1>
      <p className="mt-4 max-w-2xl text-base text-primary/75">
        The page you’re looking for doesn’t exist (or it moved).
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/">
          <Button>Go home</Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost">Contact</Button>
        </Link>
      </div>
    </Container>
  );
}

