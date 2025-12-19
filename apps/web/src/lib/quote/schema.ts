import { z } from "zod";

export const quoteSchema = z.object({
  propertyType: z.enum(["residential", "commercial", "agricultural"]),
  buildingStage: z.enum(["new_construction", "existing_building", "remodel"]),

  insulationTypes: z.array(z.string()).min(1, "Select at least one insulation type"),
  areas: z.array(z.string()).min(1, "Select at least one area"),

  squareFootage: z.coerce.number().int().positive().optional(),
  yearBuilt: z.coerce.number().int().min(1800).max(new Date().getFullYear()).optional(),
  currentInsulation: z.string().max(400).optional().or(z.literal("")),
  knownIssues: z.array(z.string()).optional().default([]),

  contactName: z.string().min(2).max(120),
  contactEmail: z.string().email().max(200),
  contactPhone: z.string().max(40).optional().or(z.literal("")),
  propertyAddress: z.string().max(300).optional().or(z.literal("")),
  preferredContactMethod: z.enum(["phone", "email", "text"]).optional(),
  availability: z
    .object({
      notes: z.string().max(600).optional().or(z.literal("")),
    })
    .optional(),

  additionalNotes: z.string().max(1200).optional().or(z.literal("")),
  referralSource: z.string().max(200).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

