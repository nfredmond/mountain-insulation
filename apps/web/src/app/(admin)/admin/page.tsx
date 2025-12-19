import { requireStaff } from "@/lib/auth/requireStaff";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Admin",
};

export default async function AdminHomePage() {
  const { supabase } = await requireStaff();

  const [{ count: newLeads }, { count: openThreads }] = await Promise.all([
    supabase
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("message_threads")
      .select("id", { count: "exact", head: true })
      .eq("status", "open"),
  ]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="p-5">
        <div className="text-sm font-semibold text-primary">New leads</div>
        <div className="mt-2 font-mono text-2xl text-primary">
          {newLeads ?? 0}
        </div>
      </Card>
      <Card className="p-5">
        <div className="text-sm font-semibold text-primary">Open threads</div>
        <div className="mt-2 font-mono text-2xl text-primary">
          {openThreads ?? 0}
        </div>
      </Card>
      <Card className="p-5">
        <div className="text-sm font-semibold text-primary">Status</div>
        <div className="mt-2 text-sm text-primary/70">
          Admin tools are live; more workflows will be added next.
        </div>
      </Card>
    </div>
  );
}

