import { requireStaff } from "@/lib/auth/requireStaff";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Documents (Admin)",
};

export default async function AdminDocumentsPage() {
  const { supabase } = await requireStaff();

  const { data: docs } = await supabase
    .from("documents")
    .select("id, title, doc_type, customer_user_id, file_name, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-primary">
          Documents
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Document metadata stored in Supabase (file download UI can be added next).
        </p>
      </div>

      <div className="space-y-3">
        {(docs ?? []).map((d) => (
          <Card key={d.id} className="p-5">
            <div className="text-sm font-semibold text-primary">{d.title}</div>
            <div className="mt-2 text-sm text-primary/70">
              {d.doc_type ?? "Document"} • {d.file_name} •{" "}
              {new Date(d.created_at).toLocaleDateString()}
            </div>
            <div className="mt-2 font-mono text-xs text-primary/60">
              Customer: {d.customer_user_id}
            </div>
          </Card>
        ))}
        {(docs ?? []).length === 0 ? (
          <Card className="p-6">
            <div className="text-sm font-semibold text-primary">No documents</div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

