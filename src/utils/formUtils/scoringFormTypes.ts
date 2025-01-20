import { selectorType } from "../general";

export type ScoringFormData = {
  gender: string;
  maritalStatus: string;
  dependentAmount: number | string;
  passportIssueDate: string;
  passportIssueBranch: string;
  employmentStatus: string;
  employerINN: number;
  salary: number;
  position: string;
  workExperienceTotal: number;
  workExperienceCurrent: number;
};

export const genderOptions: selectorType[] = [
  { label: "", value: "" },
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

export const dependantOptions: selectorType[] = [
  { label: "", value: "" },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
];

export const maritalStatusOptions: selectorType[] = [
  { label: "", value: "" },
  { label: "Married", value: "MARRIED" },
  { label: "Divorced", value: "DIVORCED" },
  { label: "Single", value: "SINGLE" },
  { label: "Widow/Widower", value: "WIDOW_WIDOWER" },
];

export const employmentStatusOptions: selectorType[] = [
  { label: "", value: "" },
  { label: "Unemployed", value: "UNEMPLOYED" },
  { label: "Self-employed", value: "SELF_EMPLOYED" },
  { label: "Employed", value: "EMPLOYED" },
  { label: "Business owner", value: "BUSINESS_OWNER" },
];

export const positionStatusOptions: selectorType[] = [
  { label: "", value: "" },
  { label: "Worker", value: "WORKER" },
  { label: "Middle manager", value: "MID_MANAGER" },
  { label: "Top manager", value: "TOP_MANAGER" },
  { label: "Owner", value: "OWNER" },
];

export enum ScoringFormFields {
  gender = "gender",
  maritalStatus = "maritalStatus",
  dependentAmount = "dependentAmount",
  passportIssueDate = "passportIssueDate",
  passportIssueBranch = "passportIssueBranch",
  employmentStatus = "employmentStatus",
  employerINN = "employerINN",
  salary = "salary",
  position = "position",
  workExperienceTotal = "workExperienceTotal",
  workExperienceCurrent = "workExperienceCurrent",
}

export const InitialScoringFormData: ScoringFormData = {
  gender: "",
  maritalStatus: "",
  dependentAmount: "",
  passportIssueDate: "",
  passportIssueBranch: "",
  employmentStatus: "",
  employerINN: 0,
  salary: 0,
  position: "",
  workExperienceTotal: 0,
  workExperienceCurrent: 0,
};
