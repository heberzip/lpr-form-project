// EXTERNAL MODULES
import { z } from "zod";
// SCHEMAS
import { companySchema } from "@schema/sectionSchemas";
import { contactSchema } from "@schema/sectionSchemas";

// DATA TYPES
export type CountryType = {
  name: string;
  code: string;
};

export type PositionType = {
  id: number;
  position: string;
};

// INFERS FROM SCHEMAS
export type CompanyType = z.infer<typeof companySchema>;

export type ContactType = z.infer<typeof contactSchema>;
