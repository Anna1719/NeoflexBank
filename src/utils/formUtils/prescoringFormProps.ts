import {
  PrescopingFormData,
  PrescopingFormFields,
  termOptions,
} from "./prescoringFormTypes";
import { formatDate } from "../formatters";
import { validateDate } from "../validateDate";
import { FormField } from "./formFieldTypes";

export const formFields: Record<string, FormField<PrescopingFormData>> = {
  lastName: {
    id: PrescopingFormFields.lastName,
    req: true,
    label: "Your last name",
    type: "text",
    placeholder: "For Example Doe",
    validation: {
      required: "Enter your last name",
      pattern: {
        value: /^[a-zA-Z]{2,}$/,
        message: "Must be at least 2 digits",
      },
    },
  },
  firstName: {
    id: PrescopingFormFields.firstName,
    label: "Your first name",
    req: true,
    type: "text",
    placeholder: "For Example John",
    validation: {
      required: "Enter your first name",
      pattern: {
        value: /^[a-zA-Z]{2,}$/,
        message: "Must be at least 2 digits",
      },
    },
  },
  middleName: {
    id: PrescopingFormFields.middleName,
    req: false,
    label: "Your patronymic",
    type: "text",
    placeholder: "For Example Victorovich",
    validation: {
      pattern: {
        value: /^[a-zA-Z]{2,}$|^$/,
        message: "Must be at least 2 digits",
      },
    },
  },
  term: {
    id: PrescopingFormFields.term,
    req: true,
    label: "Select term",
    type: "select",
    options: termOptions,
    validation: {
      required: "Choose the term",
    },
  },
  email: {
    id: PrescopingFormFields.email,
    req: true,
    label: "Your email",
    type: "email",
    placeholder: "example@mail.com",
    validation: {
      required: "Enter your email address",
      pattern: {
        value: /^[\w-.]{2,}@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        message: "Incorrect email address",
      },
    },
  },
  birthdate: {
    id: PrescopingFormFields.birthdate,
    req: true,
    label: "Your date of birth",
    type: "text",
    placeholder: "Select Date and Time",
    validation: {
      required: "Enter your date of birth",
      validate: (value: string | Date) => validateDate(value),
    },
    formatter: (value:string) => formatDate(value),
  },
  passportSeries: {
    id: PrescopingFormFields.passportSeries,
    req: true,
    label: "Your passport series",
    type: "number",
    placeholder: "0000",
    validation: {
      required: "Enter your passport series",
      pattern: {
        value: /^\d{4}$/,
        message: "The series must be 4 digits",
      },
    },
  },
  passportNumber: {
    id: PrescopingFormFields.passportNumber,
    req: true,
    label: "Your passport number",
    type: "number",
    placeholder: "000000",
    validation: {
      required: "Enter your passport number",
      pattern: {
        value: /^\d{6}$/,
        message: "The series must be 6 digits",
      },
    },
  },
};