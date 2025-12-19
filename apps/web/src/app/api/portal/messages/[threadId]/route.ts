import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const schema = z.object({
  body: z.string().min(1).max(4000),
});

type Props = { params: Promise<{ threadId: string }> };

export async function POST(req: Request, { params }: Props) {
  const { threadId } = await params;
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { error } = await supabase.from("messages").insert({
    thread_id: threadId,
    sender_user_id: user.id,
    sender_role: "customer",
    body: parsed.data.body,
  });

  if (error) {
    // RLS will also prevent writing into threads you don't own
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

