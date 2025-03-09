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

export const contactSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    position: z.string().min(2, "Position must be at least 2 characters long"),
    contactDetails: z.boolean(), // YES/NO Selection
    phone: z.string().optional(), // Inicialmente opcional
    email: z.string().optional(), // Inicialmente opcional
  })
  .superRefine((data, ctx) => {
    if (data.contactDetails) {
      // Si selecciona "YES", se activan las validaciones
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
  });

export const bankSchema = z.object({
  iban: z.string().min(5, "5 chars"),
  bankName: z.string().min(3, "3 chars"),
  swift: z.string().min(3, "3 chars"),
  sameAccountHolder: z.boolean().optional(),
  accountHolder: z.string().optional(),
});
