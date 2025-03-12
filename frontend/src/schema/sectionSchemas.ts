import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().min(1, "Required").min(3, "More than 3 chars"),
  tradeName: z.string().optional(),
  vat: z
    .string()
    .min(1, "Required")
    .regex(/^[A-Z0-9]+$/, "Invalid VAT format")
    .min(4, "More than 4 chars"),
  streetAddress: z.string().min(1, "Required").min(5, "More than 5 chars"),
  city: z.string().min(1, "Required").min(3, "More than 3 chars"),
  zipCode: z.string().min(1, "Required").min(4, "More than 4 chars"),
  country: z.string().min(1, "Required").min(3, "More than 3 chars"),
  province: z.string().optional(),
});

export const contactSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    position: z.string().min(2, "Position must be at least 2 characters long"),
    contactDetails: z.boolean(),
    phone: z.string().optional(),
    email: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.contactDetails) {
      if (!data.phone && !data.email) {
        ctx.addIssue({
          path: ["phone"],
          message:
            "You must provide at least one contact detail (Phone or Email)",
          code: z.ZodIssueCode.custom,
        });
      }
      if (data.phone && !/^[0-9\s+-]+$/.test(data.phone)) {
        ctx.addIssue({
          path: ["phone"],
          message: "Invalid phone number format",
          code: z.ZodIssueCode.custom,
        });
      }
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        ctx.addIssue({
          path: ["email"],
          message: "Invalid email format",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export const communicationSchema = z
  .object({
    emergencyPhone: z.string().min(7, "It must be at least 7 characters long"),
    reservationEmail: z.string().email("Invalid email format"),
    languages: z.array(z.string().optional()),
    website: z.string().optional(),
    whatsappAvailable: z.boolean().optional(),
    whatsappNumber: z.string().optional(),
    additionalNumbers: z.array(z.string()).optional(),
    additionalEmails: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.whatsappAvailable) {
      if (!data.whatsappNumber) {
        ctx.addIssue({
          path: ["whatsappNumber"],
          message: "You must provide a whatsapp number",
          code: z.ZodIssueCode.custom,
        });
      }
    }
    if (data.whatsappNumber && !/^[0-9\s+-]+$/.test(data.whatsappNumber)) {
      ctx.addIssue({
        path: ["whatsappNumber"],
        message: "Invalid phone number format",
        code: z.ZodIssueCode.custom,
      });
    }
    if (
      data.website &&
      data.website.length > 0 &&
      !/^https?:\/\/.+/.test(data.website)
    ) {
      ctx.addIssue({
        path: ["website"],
        message: "Invalid website format",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const bankSchema = z.object({
  iban: z.string().min(5, "5 chars"),
  bankName: z.string().min(3, "3 chars"),
  swift: z.string().min(3, "3 chars"),
  sameAccountHolder: z.boolean().optional(),
  accountHolder: z.string().optional(),
});
