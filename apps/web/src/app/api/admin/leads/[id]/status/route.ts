import { NextResponse } from "next/server";
import { z } from "zod";

import { requireStaff } from "@/lib/auth/requireStaff";

const schema = z.object({
  status: z.enum(["new", "contacted", "scheduled", "quoted", "won", "lost"]),
});

type Props = { params: { id: string } };

export async function POST(req: Request, { params }: Props) {
  const { supabase } = await requireStaff();

  const formData = await req.formData();
  const status = formData.get("status");
  const parsed = schema.safeParse({ status });
  if (!parsed.success) {
    return NextResponse.redirect(new URL(`/admin/leads/${params.id}`, req.url), {
      status: 303,
    });
  }

  await supabase
    .from("quote_requests")
    .update({ status: parsed.data.status })
    .eq("id", params.id);

  return NextResponse.redirect(new URL(`/admin/leads/${params.id}`, req.url), {
    status: 303,
  });
}

