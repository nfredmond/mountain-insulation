"use client";

import * as React from "react";
import { type FieldPath, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { quoteSchema, type QuoteInput } from "@/lib/quote/schema";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const insulationOptions = [
  "Blown-in",
  "Batt",
  "Spray foam",
  "Radiant barrier",
  "Air sealing",
];
const areaOptions = ["Attic", "Walls", "Crawlspace", "Garage", "Other"];
const issueOptions = ["Drafts", "High bills", "Hot/cold rooms", "Moisture", "Noise"];

type Step = 1 | 2 | 3 | 4 | 5;

export function QuoteWizard() {
  const [step, setStep] = React.useState<Step>(1);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState<null | { reference: string }>(
    null,
  );
  const [error, setError] = React.useState<string | null>(null);
  const [photos, setPhotos] = React.useState<File[]>([]);

  const form = useForm<QuoteInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(quoteSchema) as any,
    mode: "onBlur",
    defaultValues: {
      propertyType: "residential",
      buildingStage: "existing_building",
      insulationTypes: [],
      areas: [],
      knownIssues: [],
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      propertyAddress: "",
      preferredContactMethod: "email",
      availabilityNotes: "",
      additionalNotes: "",
      referralSource: "",
    },
  });

  async function next() {
    setError(null);
    const fields = fieldsForStep(step) as FieldPath<QuoteInput>[];
    const ok = await form.trigger(fields, { shouldFocus: true });
    if (!ok) return;
    setStep((s) => Math.min(5, (s + 1) as Step));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(1, (s - 1) as Step));
  }

  async function onSubmit(values: QuoteInput) {
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("payload", JSON.stringify(values));
      for (const file of photos.slice(0, 5)) fd.append("photos", file);

      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Unable to submit quote.");

      setSubmitted({ reference: json.reference });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit quote.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Card className="p-6">
        <div className="text-sm font-semibold text-primary">Request received</div>
        <div className="mt-2 text-sm text-primary/70">
          Thanks—your quote request is in. Your reference is{" "}
          <span className="font-mono font-semibold text-primary">
            {submitted.reference}
          </span>
          .
        </div>
        <div className="mt-4 text-sm text-primary/70">
          We’ll follow up shortly with next steps.
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-semibold text-primary">
            Quote request • Step {step} of 5
          </div>
          <div className="text-xs text-primary/60">
            Mobile-friendly • Takes ~2 minutes
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {step === 1 ? <Step1 form={form} /> : null}
          {step === 2 ? <Step2 form={form} /> : null}
          {step === 3 ? <Step3 form={form} /> : null}
          {step === 4 ? <Step4 form={form} /> : null}
          {step === 5 ? (
            <Step5
              form={form}
              photos={photos}
              setPhotos={setPhotos}
            />
          ) : null}

          {error ? (
            <div className="rounded-md border border-black/10 bg-primary/5 px-3 py-2 text-sm text-primary">
              {error}
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={back}
              disabled={step === 1 || submitting}
            >
              Back
            </Button>

            {step < 5 ? (
              <Button type="button" onClick={next} disabled={submitting}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit request"}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </form>
  );
}

function fieldsForStep(step: Step): (keyof QuoteInput)[] {
  switch (step) {
    case 1:
      return ["propertyType", "buildingStage"];
    case 2:
      return ["insulationTypes", "areas"];
    case 3:
      return ["squareFootage", "yearBuilt", "currentInsulation", "knownIssues"];
    case 4:
      return [
        "contactName",
        "contactEmail",
        "contactPhone",
        "propertyAddress",
        "preferredContactMethod",
        "availabilityNotes",
      ];
    case 5:
      return ["additionalNotes", "referralSource"];
  }
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <div className="mt-1 text-xs text-primary/70">{message}</div>;
}

function Step1({ form }: { form: ReturnType<typeof useForm<QuoteInput>> }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <div className="text-sm font-semibold text-primary">Property type</div>
        <select
          className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          {...form.register("propertyType")}
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="agricultural">Agricultural</option>
        </select>
      </div>

      <div>
        <div className="text-sm font-semibold text-primary">Project type</div>
        <select
          className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          {...form.register("buildingStage")}
        >
          <option value="existing_building">Existing building</option>
          <option value="new_construction">New construction</option>
          <option value="remodel">Remodel</option>
        </select>
      </div>
    </div>
  );
}

function Step2({ form }: { form: ReturnType<typeof useForm<QuoteInput>> }) {
  const insulationTypes = form.watch("insulationTypes");
  const areas = form.watch("areas");
  const insulationError =
    typeof form.formState.errors.insulationTypes?.message === "string"
      ? form.formState.errors.insulationTypes?.message
      : undefined;
  const areasError =
    typeof form.formState.errors.areas?.message === "string"
      ? form.formState.errors.areas?.message
      : undefined;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <div className="text-sm font-semibold text-primary">Insulation type</div>
        <div className="mt-3 space-y-2">
          {insulationOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={insulationTypes.includes(opt)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...insulationTypes, opt]
                    : insulationTypes.filter((x) => x !== opt);
                  form.setValue("insulationTypes", next, { shouldValidate: true });
                }}
              />
              <span className="text-primary/80">{opt}</span>
            </label>
          ))}
        </div>
        <FieldError message={insulationError} />
      </div>

      <div>
        <div className="text-sm font-semibold text-primary">Areas to insulate</div>
        <div className="mt-3 space-y-2">
          {areaOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={areas.includes(opt)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...areas, opt]
                    : areas.filter((x) => x !== opt);
                  form.setValue("areas", next, { shouldValidate: true });
                }}
              />
              <span className="text-primary/80">{opt}</span>
            </label>
          ))}
        </div>
        <FieldError message={areasError} />
      </div>
    </div>
  );
}

function Step3({ form }: { form: ReturnType<typeof useForm<QuoteInput>> }) {
  const knownIssues = form.watch("knownIssues");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <label className="block">
        <div className="text-sm font-semibold text-primary">Square footage</div>
        <input
          className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          inputMode="numeric"
          placeholder="e.g. 1800"
          {...form.register("squareFootage")}
        />
        <FieldError message={form.formState.errors.squareFootage?.message} />
      </label>

      <label className="block">
        <div className="text-sm font-semibold text-primary">Year built</div>
        <input
          className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          inputMode="numeric"
          placeholder="e.g. 1996"
          {...form.register("yearBuilt")}
        />
        <FieldError message={form.formState.errors.yearBuilt?.message} />
      </label>

      <label className="block md:col-span-2">
        <div className="text-sm font-semibold text-primary">
          Current insulation status (optional)
        </div>
        <input
          className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          placeholder="e.g. old fiberglass in attic, unsure in walls"
          {...form.register("currentInsulation")}
        />
      </label>

      <div className="md:col-span-2">
        <div className="text-sm font-semibold text-primary">Known issues</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {issueOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={knownIssues.includes(opt)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...knownIssues, opt]
                    : knownIssues.filter((x) => x !== opt);
                  form.setValue("knownIssues", next, { shouldValidate: true });
                }}
              />
              <span className="text-primary/80">{opt}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4({ form }: { form: ReturnType<typeof useForm<QuoteInput>> }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <label className="block">
        <div className="text-sm font-semibold text-primary">Name</div>
        <input
          className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          {...form.register("contactName")}
        />
        <FieldError message={form.formState.errors.contactName?.message} />
      </label>

      <label className="block">
        <div className="text-sm font-semibold text-primary">Email</div>
        <input
          className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          type="email"
          {...form.register("contactEmail")}
        />
        <FieldError message={form.formState.errors.contactEmail?.message} />
      </label>

      <label className="block">
        <div className="text-sm font-semibold text-primary">Phone (optional)</div>
        <input
          className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          {...form.register("contactPhone")}
        />
      </label>

      <label className="block">
        <div className="text-sm font-semibold text-primary">
          Preferred contact method
        </div>
        <select
          className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          {...form.register("preferredContactMethod")}
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="text">Text</option>
        </select>
      </label>

      <label className="block md:col-span-2">
        <div className="text-sm font-semibold text-primary">
          Property address (optional)
        </div>
        <input
          className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          placeholder="Street, City"
          {...form.register("propertyAddress")}
        />
      </label>

      <label className="block md:col-span-2">
        <div className="text-sm font-semibold text-primary">
          Availability notes (optional)
        </div>
        <textarea
          className="mt-2 min-h-24 w-full rounded-md border border-black/15 bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          placeholder="Best days/times, urgency, gate codes, etc."
          {...form.register("availabilityNotes")}
        />
      </label>
    </div>
  );
}

function Step5({
  form,
  photos,
  setPhotos,
}: {
  form: ReturnType<typeof useForm<QuoteInput>>;
  photos: File[];
  setPhotos: (files: File[]) => void;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <label className="block md:col-span-2">
        <div className="text-sm font-semibold text-primary">
          Additional notes (optional)
        </div>
        <textarea
          className="mt-2 min-h-28 w-full rounded-md border border-black/15 bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          placeholder="Anything else we should know?"
          {...form.register("additionalNotes")}
        />
      </label>

      <label className="block">
        <div className="text-sm font-semibold text-primary">
          How did you hear about us? (optional)
        </div>
        <input
          className="mt-2 h-11 w-full rounded-md border border-black/15 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          {...form.register("referralSource")}
        />
      </label>

      <div className="md:col-span-2">
        <div className="text-sm font-semibold text-primary">
          Photo upload (optional)
        </div>
        <div className="mt-2 text-sm text-primary/70">
          Add up to 5 photos (attic access, existing insulation, problem areas).
        </div>
        <input
          className="mt-3 block w-full text-sm"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            setPhotos(files.slice(0, 5));
          }}
        />
        {photos.length ? (
          <div className="mt-3 text-sm text-primary/70">
            Selected: {photos.map((f) => f.name).join(", ")}
          </div>
        ) : null}
      </div>
    </div>
  );
}

