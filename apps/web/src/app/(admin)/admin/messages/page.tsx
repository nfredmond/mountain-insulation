import Link from "next/link";

import { requireStaff } from "@/lib/auth/requireStaff";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Messages (Admin)",
};

export default async function AdminMessagesPage() {
  const { supabase } = await requireStaff();

  const { data: threads } = await supabase
    .from("message_threads")
    .select("id, subject, status, created_at, customer_user_id")
    .order("updated_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-primary">
          Messages
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Customer message threads.
        </p>
      </div>

      <div className="space-y-3">
        {(threads ?? []).map((t) => (
          <Link key={t.id} href={`/admin/messages/${t.id}`}>
            <Card className="p-5 transition-colors hover:bg-primary/5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-primary">
                  {t.subject}
                </div>
                <div className="text-xs font-semibold text-primary/70">
                  {t.status}
                </div>
              </div>
              <div className="mt-2 font-mono text-xs text-primary/60">
                {t.customer_user_id}
              </div>
            </Card>
          </Link>
        ))}
        {(threads ?? []).length === 0 ? (
          <Card className="p-6">
            <div className="text-sm font-semibold text-primary">No threads</div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

