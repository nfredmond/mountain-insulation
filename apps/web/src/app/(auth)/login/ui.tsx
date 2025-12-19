"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/portal";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      window.location.assign(redirectTo);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to sign in right now.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <label className="block">
        <div className="text-sm font-semibold text-primary">Email</div>
        <input
          className="mt-1 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="block">
        <div className="text-sm font-semibold text-primary">Password</div>
        <input
          className="mt-1 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {error ? (
        <div className="rounded-md border border-black/10 bg-primary/5 px-3 py-2 text-sm text-primary">
          {error}
        </div>
      ) : null}

      <Button className="w-full" type="submit" disabled={submitting}>
        {submitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

