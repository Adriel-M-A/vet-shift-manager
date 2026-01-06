import { z } from "zod";

export const clientSchema = z.object({
  full_name: z.string().min(1, "Full Name is required"),
  document_number: z.string().min(1, "Document Number is required").regex(/^\d+$/, "Must be only numbers"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  notes: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;
