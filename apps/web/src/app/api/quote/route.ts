import { NextResponse } from "next/server";
import { Resend } from "resend";

import { quoteSchema } from "@/lib/quote/schema";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const BUCKET = "quote-uploads";

export async function POST(req: Request) {
  const formData = await req.formData();

  const payloadRaw = formData.get("payload");
  if (typeof payloadRaw !== "string") {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }

  const parsedJson = safeJsonParse(payloadRaw);
  if (!parsedJson.ok) {
    return NextResponse.json({ error: "Invalid payload JSON" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(parsedJson.value);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid quote data", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();

  const { data: quote, error: insertError } = await supabase
    .from("quote_requests")
    .insert({
      status: "new",
      property_type: parsed.data.propertyType,
      building_stage: parsed.data.buildingStage,
      insulation_types: parsed.data.insulationTypes,
      areas: parsed.data.areas,
      square_footage: parsed.data.squareFootage ?? null,
      year_built: parsed.data.yearBuilt ?? null,
      current_insulation: parsed.data.currentInsulation || null,
      known_issues: parsed.data.knownIssues ?? [],
      contact_name: parsed.data.contactName,
      contact_email: parsed.data.contactEmail,
      contact_phone: parsed.data.contactPhone || null,
      property_address: parsed.data.propertyAddress || null,
      preferred_contact_method: parsed.data.preferredContactMethod || null,
      availability: parsed.data.availability ?? null,
      additional_notes: parsed.data.additionalNotes || null,
      referral_source: parsed.data.referralSource || null,
      customer_user_id: null,
      assigned_to_user_id: null,
    })
    .select("*")
    .single();

  if (insertError) {
    return NextResponse.json(
      { error: "Failed to create quote request" },
      { status: 500 },
    );
  }

  const files = formData.getAll("photos");
  for (const f of files) {
    if (!(f instanceof File)) continue;
    if (f.size === 0) continue;

    const safeName = sanitizeFilename(f.name || "upload");
    const objectPath = `quote-requests/${quote.id}/${Date.now()}-${safeName}`;

    const arrayBuffer = await f.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(objectPath, new Uint8Array(arrayBuffer), {
        contentType: f.type || "application/octet-stream",
        upsert: false,
      });

    if (!uploadError) {
      await supabase.from("quote_request_attachments").insert({
        quote_request_id: quote.id,
        storage_path: objectPath,
        file_name: safeName,
        content_type: f.type || null,
        size_bytes: f.size,
      });
    }
  }

  await maybeSendEmails({
    quoteId: quote.id,
    contactEmail: parsed.data.contactEmail,
    contactName: parsed.data.contactName,
  });

  return NextResponse.json({
    ok: true,
    quoteId: quote.id,
    reference: quote.id.slice(0, 8).toUpperCase(),
  });
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^\w.\-()+ ]+/g, "_").slice(0, 120);
}

function safeJsonParse(value: string):
  | { ok: true; value: unknown }
  | { ok: false; error: unknown } {
  try {
    return { ok: true, value: JSON.parse(value) };
  } catch (error) {
    return { ok: false, error };
  }
}

async function maybeSendEmails({
  quoteId,
  contactEmail,
  contactName,
}: {
  quoteId: string;
  contactEmail: string;
  contactName: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  const adminTo = process.env.EMAIL_ADMIN_TO;

  if (!resendKey || !emailFrom || !adminTo) return;

  const resend = new Resend(resendKey);
  const reference = quoteId.slice(0, 8).toUpperCase();

  await resend.emails.send({
    from: emailFrom,
    to: contactEmail,
    subject: `Quote request received (${reference})`,
    text: `Hi ${contactName},\n\nThanks for reaching out to Mountain Insulation. We received your quote request.\n\nReference: ${reference}\n\nWe’ll follow up shortly with next steps.\n`,
  });

  await resend.emails.send({
    from: emailFrom,
    to: adminTo,
    subject: `New quote request (${reference})`,
    text: `New quote request submitted.\n\nReference: ${reference}\nQuote ID: ${quoteId}\nCustomer: ${contactName} <${contactEmail}>\n`,
  });
}

