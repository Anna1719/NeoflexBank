import { selectorType } from "./general";

export type PrescopingFormData = {
  amount: number;
  term: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  birthdate: string | Date;
  passportSeries: string;
  passportNumber: string;
};

export enum PrescopingFormFields {
  amount = "amount",
  term = "term",
  firstName = "firstName",
  lastName = "lastName",
  middleName = "middleName",
  email = "email",
  birthdate = "birthdate",
  passportSeries = "passportSeries",
  passportNumber = "passportNumber",
}

export const termOptions: selectorType[] = [
  { label: "6 months", value: 6 },
  { label: "12 month", value: 12 },
  { label: "18 month", value: 18 },
  { label: "24 month", value: 24 },
];

export const initialFormData: PrescopingFormData = {
  amount: 150000,
  term: 6,
  firstName: "",
  lastName: "",
  middleName: null,
  email: "",
  birthdate: "",
  passportSeries: "",
  passportNumber: "",
};
