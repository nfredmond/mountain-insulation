import Link from "next/link";

import { requireStaff } from "@/lib/auth/requireStaff";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Leads",
};

export default async function AdminLeadsPage() {
  const { supabase } = await requireStaff();

  const { data: leads } = await supabase
    .from("quote_requests")
    .select(
      "id, created_at, status, contact_name, contact_email, property_type, building_stage",
    )
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-primary">
          Leads
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Latest quote requests.
        </p>
      </div>

      <div className="space-y-3">
        {(leads ?? []).map((l) => (
          <Link key={l.id} href={`/admin/leads/${l.id}`}>
            <Card className="p-5 transition-colors hover:bg-primary/5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-primary">
                  {l.contact_name}{" "}
                  <span className="text-primary/60">&lt;{l.contact_email}&gt;</span>
                </div>
                <div className="text-xs font-semibold text-primary/70">
                  {l.status}
                </div>
              </div>
              <div className="mt-2 text-sm text-primary/70">
                {l.property_type ?? "—"} • {l.building_stage ?? "—"} •{" "}
                Ref{" "}
                <span className="font-mono">{l.id.slice(0, 8).toUpperCase()}</span>
              </div>
            </Card>
          </Link>
        ))}
        {(leads ?? []).length === 0 ? (
          <Card className="p-6">
            <div className="text-sm font-semibold text-primary">No leads</div>
            <div className="mt-2 text-sm text-primary/70">
              Once a quote request is submitted, it will appear here.
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

