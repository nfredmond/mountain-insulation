import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Quotes",
};

export default async function PortalQuotesPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: quotes } = await supabase
    .from("quote_requests")
    .select("id, created_at, status, property_type, building_stage")
    .eq("customer_user_id", user?.id ?? "")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-primary">
            Quotes
          </h1>
          <p className="mt-2 text-sm text-primary/70">
            Quote requests submitted while signed in will appear here.
          </p>
        </div>

        <a href="/quote">
          <Button>New quote</Button>
        </a>
      </div>

      <div className="space-y-3">
        {(quotes ?? []).length ? (
          quotes!.map((q) => (
            <Card key={q.id} className="p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-primary">
                  Reference{" "}
                  <span className="font-mono">{q.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="text-xs font-semibold text-primary/70">
                  Status: {q.status}
                </div>
              </div>
              <div className="mt-2 text-sm text-primary/70">
                {q.property_type ?? "—"} • {q.building_stage ?? "—"} •{" "}
                {new Date(q.created_at).toLocaleDateString()}
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-6">
            <div className="text-sm font-semibold text-primary">
              No quotes yet
            </div>
            <div className="mt-2 text-sm text-primary/70">
              Submit a quote request while signed in, and it will show up here.
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

