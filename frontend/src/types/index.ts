// EXTERNAL MODULES
import { z } from "zod";
// SCHEMAS
import { companySchema } from "@schema/sectionSchemas";
import { contactSchema } from "@schema/sectionSchemas";
import { communicationSchema } from "@schema/sectionSchemas";

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

export type LanguageType = {
  code: string;
  name: string;
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

export type FormMainDataType = {
  id: number;
  name: string;
  label: string;
  additionalInfo?: string;
  type: string;
  role: string;
  placeholder: string;
  required: boolean;
  gridPosition: number;
};

export type DecisionDataType = FormMainDataType & {
  options: { label: string; value: boolean }[];
  dependents: FormMainDataType[];
};

// COMPANY SECTION TYPE
export type CompanySectionType = BaseSectionType & {
  formMainData: FormMainDataType[];
  formGridData: FormMainDataType[];
};

// CONTACT SECTION TYPE
export type ContactSectionType = BaseSectionType & {
  formMainData: FormMainDataType[];
  decisionData: DecisionDataType[];
};

// COMMUNICATION SECTION TYPE
export type CommunicationSectionType = BaseSectionType & {
  formMainData: FormMainDataType[];
  formGridData: FormMainDataType[];
  decisionData: DecisionDataType[];
};

// UNION TYPE FOR ALL SECTIONS
export type SectionType = CompanySectionType | CommunicationSectionType;

// INFERS FROM SCHEMAS
export type CompanyType = z.infer<typeof companySchema>;

export type ContactType = z.infer<typeof contactSchema>;

export type CommunicationType = z.infer<typeof communicationSchema>;
