import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default async function PortalHomePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-primary">
            Customer Portal
          </h1>
          <p className="mt-2 text-sm text-primary/70">
            Signed in as <span className="font-semibold">{user?.email}</span>
          </p>
        </div>

        <form action="/api/auth/signout" method="post">
          <Button type="submit" variant="ghost">
            Sign out
          </Button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/portal/quotes", label: "Quotes" },
          { href: "/portal/projects", label: "Projects" },
          { href: "/portal/documents", label: "Documents" },
          { href: "/portal/messages", label: "Messages" },
          { href: "/portal/schedule", label: "Schedule" },
          { href: "/portal/settings", label: "Settings" },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="p-5 transition-colors hover:bg-primary/5">
              <div className="text-sm font-semibold text-primary">
                {item.label}
              </div>
              <div className="mt-2 text-sm text-primary/70">
                Coming online as we connect your Supabase data.
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

