import {
  ScoringFormFields,
  ScoringFormData,
  genderOptions,
  maritalStatusOptions,
  employmentStatusOptions,
  positionStatusOptions,
  dependantOptions,
} from "./scoringFormTypes";
import { formatDate, formatDivisionCode } from "../formatters";
import { selectorType } from "../general";
import { validatePassportDate } from "../validateDate";

export type FormField = {
  id: keyof ScoringFormData;
  req: boolean;
  label: string;
  type: string;
  placeholder?: string;
  options?: selectorType[];
  validation?: Record<string, unknown>;
  order?: number;
  formatter?: (value: string) => string;
};

export const formFieldsFirst: Record<string, FormField> = {
  gender: {
    id: ScoringFormFields.gender,
    req: true,
    label: "What`s your gender",
    type: "select",
    options: genderOptions,
    validation: {
      required: "Select one of the options",
    },
  },
  maritalStatus: {
    id: ScoringFormFields.maritalStatus,
    req: true,
    label: "Your marital status",
    type: "select",
    options: maritalStatusOptions,
    validation: {
      required: "Select one of the options",
    },
  },
  dependentAmount: {
    id: ScoringFormFields.dependentAmount,
    req: true,
    label: "Your number of dependents",
    type: "select",
    options: dependantOptions,
    validation: {
      required: "Select one of the options",
    },
  },
  passportIssueDate: {
    id: ScoringFormFields.passportIssueDate,
    req: true,
    label: "Passport issue date",
    type: "text",
    placeholder: "Select Date and Time",
    validation: {
      required: "Enter your passport issue date",
      validate: (value: string) => validatePassportDate(value),
    },
    formatter: (value: string) => formatDate(value),
  },
  passportIssueBranch: {
    id: ScoringFormFields.passportIssueBranch,
    req: true,
    label: "Division code",
    type: "text",
    placeholder: "000000",
    validation: {
      required: "The series must be 6 digits",
      pattern: {
        value: /^\d{3}-\d{3}$/,
        message: "The series must be 6 digits",
      },
    },
    formatter: (value: string) => formatDivisionCode(value),
  },
};

export const formFieldsSecond: Record<string, FormField> = {
  employmentStatus: {
    id: ScoringFormFields.employmentStatus,
    req: true,
    label: "Your employment status",
    type: "select",
    options: employmentStatusOptions,
    validation: {
      required: "Select one of the options",
    },
  },
  employerINN: {
    id: ScoringFormFields.employerINN,
    req: true,
    label: "Your employer INN",
    type: "text",
    placeholder: "000000000000",
    validation: {
      required: "Department code must be 12 digits",
      pattern: {
        value: /^\d{12}$/,
        message: "Department code must be 12 digits",
      },
    },
  },
  salary: {
    id: ScoringFormFields.salary,
    req: true,
    label: "Your salary",
    type: "number",
    placeholder: "For example 100 000",
    validation: {
      required: "Enter your salary",
    },
  },
  position: {
    id: ScoringFormFields.position,
    req: true,
    label: "Your job position",
    type: "select",
    options: positionStatusOptions,
    validation: {
      required: "Select one of the options",
    },
  },
  workExperienceTotal: {
    id: ScoringFormFields.workExperienceTotal,
    req: true,
    label: "Total work experience",
    type: "number",
    placeholder: "For example 10",
    validation: {
      required: "Enter your total work experience",
      pattern: {
        value: /^\d{1,2}$/,
        message: "Must be a valid number (up to 2 digits)",
      },
    },
  },
  workExperienceCurrent: {
    id: ScoringFormFields.workExperienceCurrent,
    req: true,
    label: "Current work experience",
    type: "number",
    placeholder: "For example 2",
    validation: {
      required: "Enter your current work experience",
      pattern: {
        value: /^\d{1,2}$/,
        message: "Must be a valid number (up to 2 digits)",
      },
    },
  },
};