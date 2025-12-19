import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Messages",
};

export default async function PortalMessagesPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: threads } = await supabase
    .from("message_threads")
    .select("id, subject, status, created_at")
    .eq("customer_user_id", user?.id ?? "")
    .order("updated_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-primary">
            Messages
          </h1>
          <p className="mt-2 text-sm text-primary/70">
            Secure communication with the team.
          </p>
        </div>
        <Link href="/portal/messages/new">
          <Button>New message</Button>
        </Link>
      </div>

      {(threads ?? []).length ? (
        <div className="space-y-3">
          {threads!.map((t) => (
            <Link key={t.id} href={`/portal/messages/${t.id}`}>
              <Card className="p-5 transition-colors hover:bg-primary/5">
                <div className="text-sm font-semibold text-primary">
                  {t.subject}
                </div>
                <div className="mt-2 text-sm text-primary/70">
                  Status: {t.status} • Started{" "}
                  {new Date(t.created_at).toLocaleDateString()}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <div className="text-sm font-semibold text-primary">
            No messages yet
          </div>
          <div className="mt-2 text-sm text-primary/70">
            Start a thread and we’ll respond here.
          </div>
        </Card>
      )}
    </div>
  );
}

