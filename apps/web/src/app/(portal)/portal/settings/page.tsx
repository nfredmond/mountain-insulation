import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Settings",
};

export default async function PortalSettingsPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-primary">
          Settings
        </h1>
        <p className="mt-2 text-sm text-primary/70">
          Account settings and notifications.
        </p>
      </div>

      <Card className="p-6">
        <div className="text-sm font-semibold text-primary">Signed in</div>
        <div className="mt-2 text-sm text-primary/70">{user?.email}</div>

        <div className="mt-6">
          <form action="/api/auth/signout" method="post">
            <Button type="submit" variant="ghost">
              Sign out
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

