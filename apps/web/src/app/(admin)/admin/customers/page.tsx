import { requireStaff } from "@/lib/auth/requireStaff";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Customers",
};

export default async function AdminCustomersPage() {
  const { supabase } = await requireStaff();

  const { data: customers } = await supabase
    .from("profiles")
    .select("user_id, full_name, phone, role, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-primary">
          Customers
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Customer profiles (Supabase Auth users).
        </p>
      </div>

      <div className="space-y-3">
        {(customers ?? []).map((c) => (
          <Card key={c.user_id} className="p-5">
            <div className="text-sm font-semibold text-primary">
              {c.full_name ?? "Unnamed"}{" "}
              <span className="text-primary/60">({c.role})</span>
            </div>
            <div className="mt-2 text-sm text-primary/70">
              {c.phone ?? "—"} • Created{" "}
              {new Date(c.created_at).toLocaleDateString()}
            </div>
            <div className="mt-2 font-mono text-xs text-primary/60">
              {c.user_id}
            </div>
          </Card>
        ))}
        {(customers ?? []).length === 0 ? (
          <Card className="p-6">
            <div className="text-sm font-semibold text-primary">
              No customers yet
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

