import { requireStaff } from "@/lib/auth/requireStaff";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Lead",
};

type Props = { params: Promise<{ id: string }> };

const statuses = ["new", "contacted", "scheduled", "quoted", "won", "lost"] as const;

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params;
  const { supabase } = await requireStaff();

  const { data: lead } = await supabase
    .from("quote_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (!lead) {
    return (
      <Card className="p-6">
        <div className="text-sm font-semibold text-primary">Not found</div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-primary">
              {lead.contact_name}{" "}
              <span className="text-primary/60">&lt;{lead.contact_email}&gt;</span>
            </div>
            <div className="mt-2 text-sm text-primary/70">
              Ref <span className="font-mono">{lead.id.slice(0, 8).toUpperCase()}</span> •{" "}
              {new Date(lead.created_at).toLocaleString()}
            </div>
          </div>

          <form action={`/api/admin/leads/${lead.id}/status`} method="post" className="flex items-center gap-2">
            <select
              name="status"
              defaultValue={lead.status}
              className="h-10 rounded-md border border-black/15 bg-background px-3 text-sm"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Button type="submit" variant="secondary">
              Update
            </Button>
          </form>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-sm font-semibold text-primary">Project details</div>
          <div className="mt-3 text-sm text-primary/70">
            {lead.property_type ?? "—"} • {lead.building_stage ?? "—"}
          </div>
          <div className="mt-3 text-sm text-primary/70">
            <span className="font-semibold text-primary/80">Areas:</span>{" "}
            {(lead.areas ?? []).join(", ") || "—"}
          </div>
          <div className="mt-2 text-sm text-primary/70">
            <span className="font-semibold text-primary/80">Types:</span>{" "}
            {(lead.insulation_types ?? []).join(", ") || "—"}
          </div>
          <div className="mt-2 text-sm text-primary/70">
            <span className="font-semibold text-primary/80">Sq ft:</span>{" "}
            {lead.square_footage ?? "—"}
          </div>
          <div className="mt-2 text-sm text-primary/70">
            <span className="font-semibold text-primary/80">Year built:</span>{" "}
            {lead.year_built ?? "—"}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-semibold text-primary">Notes</div>
          <div className="mt-3 whitespace-pre-wrap text-sm text-primary/70">
            {lead.additional_notes ?? "—"}
          </div>
        </Card>
      </div>
    </div>
  );
}

