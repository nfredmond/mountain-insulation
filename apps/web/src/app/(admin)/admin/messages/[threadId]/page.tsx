import { requireStaff } from "@/lib/auth/requireStaff";
import { Card } from "@/components/ui/Card";
import { ReplyFormAdmin } from "./ui";

export const metadata = {
  title: "Thread (Admin)",
};

type Props = { params: { threadId: string } };

export default async function AdminThreadPage({ params }: Props) {
  const { supabase } = await requireStaff();

  const { data: thread } = await supabase
    .from("message_threads")
    .select("id, subject, status, customer_user_id, created_at")
    .eq("id", params.threadId)
    .single();

  if (!thread) {
    return (
      <Card className="p-6">
        <div className="text-sm font-semibold text-primary">Not found</div>
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
      <Card className="p-6">
        <div className="text-sm font-semibold text-primary">{thread.subject}</div>
        <div className="mt-2 text-sm text-primary/70">
          Status: {thread.status} • Customer:{" "}
          <span className="font-mono">{thread.customer_user_id}</span>
        </div>
        <div className="mt-2 text-sm text-primary/70">
          Started {new Date(thread.created_at).toLocaleString()}
        </div>
      </Card>

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

      <ReplyFormAdmin threadId={thread.id} />
    </div>
  );
}

