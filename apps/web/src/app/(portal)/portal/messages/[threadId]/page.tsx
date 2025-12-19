import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { ReplyForm } from "./ui";

export const metadata = {
  title: "Message thread",
};

type Props = { params: Promise<{ threadId: string }> };

export default async function ThreadPage({ params }: Props) {
  const { threadId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: thread } = await supabase
    .from("message_threads")
    .select("id, subject, status, customer_user_id")
    .eq("id", threadId)
    .single();

  if (!thread || thread.customer_user_id !== user?.id) {
    return (
      <Card className="p-6">
        <div className="text-sm font-semibold text-primary">Not found</div>
        <div className="mt-2 text-sm text-primary/70">
          This thread does not exist or you don’t have access.
        </div>
        <div className="mt-4">
          <Link className="text-sm font-semibold underline underline-offset-4" href="/portal/messages">
            Back to messages
          </Link>
        </div>
      </Card>
    );
  }

  const { data: msgs } = await supabase
    .from("messages")
    .select("id, created_at, sender_role, body")
    .eq("thread_id", thread.id)
    .order("created_at", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <Link className="text-sm font-semibold text-primary/70 hover:text-primary" href="/portal/messages">
          ← Back to messages
        </Link>
        <h1 className="mt-3 font-display text-3xl tracking-tight text-primary">
          {thread.subject}
        </h1>
        <div className="mt-2 text-sm text-primary/70">Status: {thread.status}</div>
      </div>

      <div className="space-y-3">
        {(msgs ?? []).map((m) => (
          <Card key={m.id} className="p-5">
            <div className="text-xs font-semibold text-primary/60">
              {m.sender_role} • {new Date(m.created_at).toLocaleString()}
            </div>
            <div className="mt-2 whitespace-pre-wrap text-sm text-primary/80">
              {m.body}
            </div>
          </Card>
        ))}
      </div>

      <ReplyForm threadId={thread.id} />
    </div>
  );
}

