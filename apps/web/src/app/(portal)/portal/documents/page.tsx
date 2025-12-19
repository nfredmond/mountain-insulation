import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Documents",
};

export default async function PortalDocumentsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: docs } = await supabase
    .from("documents")
    .select("id, title, doc_type, created_at, file_name")
    .eq("customer_user_id", user?.id ?? "")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-primary">
          Documents
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Contracts, invoices, warranties, and photos will appear here.
        </p>
      </div>

      {(docs ?? []).length ? (
        <div className="space-y-3">
          {docs!.map((d) => (
            <Card key={d.id} className="p-5">
              <div className="text-sm font-semibold text-primary">{d.title}</div>
              <div className="mt-2 text-sm text-primary/70">
                {d.doc_type ?? "Document"} • {d.file_name} •{" "}
                {new Date(d.created_at).toLocaleDateString()}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <div className="text-sm font-semibold text-primary">
            No documents yet
          </div>
          <div className="mt-2 text-sm text-primary/70">
            Once your project is underway, contracts and invoices will appear
            here.
          </div>
        </Card>
      )}
    </div>
  );
}

