import { NextResponse } from "next/server";
import { z } from "zod";

import { requireStaff } from "@/lib/auth/requireStaff";

const schema = z.object({
  body: z.string().min(1).max(4000),
});

type Props = { params: { threadId: string } };

export async function POST(req: Request, { params }: Props) {
  const { supabase, user, profile } = await requireStaff();

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { error } = await supabase.from("messages").insert({
    thread_id: params.threadId,
    sender_user_id: user.id,
    sender_role: profile?.role === "admin" || profile?.role === "staff" ? "staff" : "system",
    body: parsed.data.body,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

