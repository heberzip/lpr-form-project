import { z } from "zod";

export const companySchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters long"),
  tradeName: z.string().optional(),
  vat: z.string().regex(/^[A-Z0-9]+$/, "Invalid VAT format"),
  streetAddress: z
    .string()
    .min(5, "Address must be at least 5 characters long"),
  city: z.string().min(2, "City name must be at least 2 characters long"),
  zipCode: z.string().min(4, "Zip code must be at least 4 characters"),
  country: z.string().min(2, "Please select a country"),
  province: z.string().optional(),
});

export const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  position: z.string().min(2, "Position must be at least 2 characters long"),
  contactDetails: z.boolean().optional(),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  email: z.string().email("Invalid email format"),
});
