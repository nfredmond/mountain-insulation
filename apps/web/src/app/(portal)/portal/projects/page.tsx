import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Projects",
};

export default async function PortalProjectsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, status, created_at")
    .eq("customer_user_id", user?.id ?? "")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-primary">
          Projects
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Active and completed projects tied to your account.
        </p>
      </div>

      <div className="space-y-3">
        {(projects ?? []).length ? (
          projects!.map((p) => (
            <Card key={p.id} className="p-5">
              <div className="text-sm font-semibold text-primary">{p.title}</div>
              <div className="mt-2 text-sm text-primary/70">
                Status: {p.status} • Started{" "}
                {new Date(p.created_at).toLocaleDateString()}
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-6">
            <div className="text-sm font-semibold text-primary">
              No projects yet
            </div>
            <div className="mt-2 text-sm text-primary/70">
              Once a quote is approved and scheduled, your project will appear
              here.
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

