import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const schema = z.object({
  subject: z.string().min(2).max(200),
  body: z.string().min(1).max(4000),
});

export async function POST(req: Request) {
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

  const { data: thread, error: threadError } = await supabase
    .from("message_threads")
    .insert({
      customer_user_id: user.id,
      subject: parsed.data.subject,
      status: "open",
    })
    .select("id")
    .single();

  if (threadError || !thread) {
    return NextResponse.json(
      { error: "Failed to create thread" },
      { status: 500 },
    );
  }

  const { error: msgError } = await supabase.from("messages").insert({
    thread_id: thread.id,
    sender_user_id: user.id,
    sender_role: "customer",
    body: parsed.data.body,
  });

  if (msgError) {
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, threadId: thread.id });
}

