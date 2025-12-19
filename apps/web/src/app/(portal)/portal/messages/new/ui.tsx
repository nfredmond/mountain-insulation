"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function NewMessageForm() {
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/portal/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Unable to send message.");

      window.location.assign(`/portal/messages/${json.threadId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card className="space-y-4 p-6">
        <label className="block">
          <div className="text-sm font-semibold text-primary">Subject</div>
          <input
            className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>

        <label className="block">
          <div className="text-sm font-semibold text-primary">Message</div>
          <textarea
            className="mt-2 min-h-32 w-full rounded-md border border-black/15 bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>

        {error ? (
          <div className="rounded-md border border-black/10 bg-primary/5 px-3 py-2 text-sm text-primary">
            {error}
          </div>
        ) : null}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>
      </Card>
    </form>
  );
}

