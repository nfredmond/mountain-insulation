"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ReplyFormAdmin({ threadId }: { threadId: string }) {
  const [body, setBody] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/messages/${threadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Unable to send message.");

      setBody("");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card className="space-y-3 p-6">
        <div className="text-sm font-semibold text-primary">Reply as staff</div>
        <textarea
          className="min-h-28 w-full rounded-md border border-black/15 bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {error ? (
          <div className="rounded-md border border-black/10 bg-primary/5 px-3 py-2 text-sm text-primary">
            {error}
          </div>
        ) : null}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send"}
        </Button>
      </Card>
    </form>
  );
}

