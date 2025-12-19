import Link from "next/link";

import { requireStaff } from "@/lib/auth/requireStaff";
import { Card } from "@/components/ui/Card";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile, user } = await requireStaff();

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-2xl text-primary">Admin</div>
            <div className="mt-1 text-sm text-primary/70">
              Signed in as {profile?.full_name ?? user.email} ({profile?.role})
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
            <Link className="text-primary/70 hover:text-primary" href="/admin">
              Overview
            </Link>
            <Link
              className="text-primary/70 hover:text-primary"
              href="/admin/leads"
            >
              Leads
            </Link>
            <Link
              className="text-primary/70 hover:text-primary"
              href="/admin/projects"
            >
              Projects
            </Link>
            <Link
              className="text-primary/70 hover:text-primary"
              href="/admin/customers"
            >
              Customers
            </Link>
            <Link
              className="text-primary/70 hover:text-primary"
              href="/admin/documents"
            >
              Documents
            </Link>
            <Link
              className="text-primary/70 hover:text-primary"
              href="/admin/messages"
            >
              Messages
            </Link>
            <Link
              className="text-primary/70 hover:text-primary"
              href="/admin/settings"
            >
              Settings
            </Link>
          </nav>
        </div>
      </Card>

      {children}
    </div>
  );
}

