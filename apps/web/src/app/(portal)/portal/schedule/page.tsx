import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "Schedule",
};

export default async function PortalSchedulePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: appts } = await supabase
    .from("appointments")
    .select("id, created_at, status, notes")
    .eq("customer_user_id", user?.id ?? "")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-primary">
          Schedule
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Appointment requests and scheduling updates.
        </p>
      </div>

      <Card className="p-6">
        <div className="text-sm font-semibold text-primary">
          Request an appointment
        </div>
        <div className="mt-2 text-sm text-primary/70">
          For now, include a few preferred dates/times in a message thread and we’ll confirm.
        </div>
        <div className="mt-4">
          <Link href="/portal/messages/new">
            <Button>Send availability</Button>
          </Link>
        </div>
      </Card>

      {(appts ?? []).length ? (
        <div className="space-y-3">
          {appts!.map((a) => (
            <Card key={a.id} className="p-5">
              <div className="text-sm font-semibold text-primary">
                {a.status}
              </div>
              <div className="mt-2 text-sm text-primary/70">
                Requested {new Date(a.created_at).toLocaleDateString()}
                {a.notes ? ` • ${a.notes}` : ""}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <div className="text-sm font-semibold text-primary">
            No appointment requests yet
          </div>
          <div className="mt-2 text-sm text-primary/70">
            Once requested, scheduling updates will appear here.
          </div>
        </Card>
      )}
    </div>
  );
}

