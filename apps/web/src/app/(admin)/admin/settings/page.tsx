import { requireStaff } from "@/lib/auth/requireStaff";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Settings (Admin)",
};

export default async function AdminSettingsPage() {
  const { user, profile } = await requireStaff();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-primary">
          Settings
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Admin settings and configuration.
        </p>
      </div>

      <Card className="p-6">
        <div className="text-sm font-semibold text-primary">Role</div>
        <div className="mt-2 text-sm text-primary/70">{profile?.role}</div>
        <div className="mt-6 text-sm text-primary/70">
          To grant staff access, set a user’s `profiles.role` to `staff` or
          `admin` in Supabase.
        </div>

        <div className="mt-6">
          <form action="/api/auth/signout" method="post">
            <Button type="submit" variant="ghost">
              Sign out ({user.email})
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

