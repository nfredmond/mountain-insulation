import { NextResponse } from "next/server";
import { z } from "zod";

import { requireStaff } from "@/lib/auth/requireStaff";

const schema = z.object({
  status: z.enum(["new", "contacted", "scheduled", "quoted", "won", "lost"]),
});

type Props = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Props) {
  const { id } = await params;
  const { supabase } = await requireStaff();

  const formData = await req.formData();
  const status = formData.get("status");
  const parsed = schema.safeParse({ status });
  if (!parsed.success) {
    return NextResponse.redirect(new URL(`/admin/leads/${id}`, req.url), {
      status: 303,
    });
  }

  await supabase
    .from("quote_requests")
    .update({ status: parsed.data.status })
    .eq("id", id);

  return NextResponse.redirect(new URL(`/admin/leads/${id}`, req.url), {
    status: 303,
  });
}

