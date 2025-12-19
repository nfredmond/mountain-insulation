import { requireStaff } from "@/lib/auth/requireStaff";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Projects (Admin)",
};

export default async function AdminProjectsPage() {
  const { supabase } = await requireStaff();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-primary">
          Projects
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Project records (creation/edit UI will be expanded next).
        </p>
      </div>

      <div className="space-y-3">
        {(projects ?? []).map((p) => (
          <Card key={p.id} className="p-5">
            <div className="text-sm font-semibold text-primary">{p.title}</div>
            <div className="mt-2 text-sm text-primary/70">
              Status: {p.status} • {new Date(p.created_at).toLocaleDateString()}
            </div>
          </Card>
        ))}
        {(projects ?? []).length === 0 ? (
          <Card className="p-6">
            <div className="text-sm font-semibold text-primary">No projects</div>
            <div className="mt-2 text-sm text-primary/70">
              Projects will show up here once created.
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

