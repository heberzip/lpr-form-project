// EXTERNAL MODULES
import { z } from "zod";
// SCHEMAS
import { companySchema } from "@schema/sectionSchemas";
import { contactSchema } from "@schema/sectionSchemas";

// DATA TYPES
export type CountryType = {
  name: string;
  dial_code: string;
  code: string;
};

export type PositionType = {
  id: number;
  position: string;
};

// BASE TYPE FOR ALL SECTIONS
export type BaseSectionType = {
  base: {
    id: number;
    link: string;
    title: string;
    description: string;
  };
};

// COMPANY SECTION TYPE
export type CompanySectionType = BaseSectionType & {
  formMainData: {
    id: number;
    name: string;
    label: string;
    additionalInfo?: string;
    type: string;
    placeholder: string;
    required: boolean;
  }[];
  formGridData?: any[]; // eslint-disable-line
};

// COMMUNICATION SECTION TYPE
export type CommunicationSectionType = BaseSectionType & {
  formMainData: {
    id: number;
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
  }[];
  desitionData?: {
    id: number;
    name: string;
    label: string;
    type: string;
    options: { label: string; value: boolean }[];
    dependents?: any[]; // eslint-disable-line
  }[];
  additionalContacts?: any; // eslint-disable-line
};

// UNION TYPE FOR ALL SECTIONS
export type SectionType = CompanySectionType | CommunicationSectionType;

// INFERS FROM SCHEMAS
export type CompanyType = z.infer<typeof companySchema>;

export type ContactType = z.infer<typeof contactSchema>;
