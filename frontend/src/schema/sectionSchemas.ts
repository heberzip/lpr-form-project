import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().min(2, "At least 2 chars long"),
  tradeName: z.string().optional(),
  vat: z
    .string()
    .regex(/^[A-Z0-9]+$/, "Invalid VAT format")
    .min(4, "At least 4 chars long"),
  streetAddress: z.string().min(5, "5 chars long"),
  city: z.string().min(2, "2 chars long"),
  zipCode: z.string().min(4, "4 chars"),
  country: z.string().min(2, "country"),
  province: z.string().optional(),
});

export const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  position: z.string().min(2, "Position must be at least 2 characters long"),
  contactDetails: z.boolean().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export const communicationSchema = z.object({
  emergencyPhone: z.string().min(7, "It must be at least 7 characters long"),
  reservationEmail: z.string().email("Invalid email format"),
  whatsappAvailable: z.boolean().optional(),
  whatsappNumber: z.string().optional(),
  additionalNumbers: z
    .array(z.object({ type: z.string().min(1), value: z.string().min(10) }))
    .optional(),
  additionalEmails: z
    .array(
      z.object({
        type: z.string().min(1),
        value: z.string().email("Invalid email format"),
      })
    )
    .optional(),
});
