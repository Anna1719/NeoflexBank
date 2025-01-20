import { ScoringFormData } from "./scoringFormTypes";

const ACCOUNT_NUMBER = "11223344556677890000";

interface TransformedData {
  gender: string;
  maritalStatus: string;
  dependentAmount: number | string;
  passportIssueDate: string;
  passportIssueBranch: string;
  employment: {
    employmentStatus: string;
    employerINN: number;
    salary: number;
    position: string;
    workExperienceTotal: number;
    workExperienceCurrent: number;
  };
  account: string;
}

export const transformData = (data: ScoringFormData): TransformedData => {
  return {
    gender: data.gender,
    maritalStatus: data.maritalStatus,
    dependentAmount: data.dependentAmount,
    passportIssueDate: data.passportIssueDate,
    passportIssueBranch: data.passportIssueBranch,
    employment: {
      employmentStatus: data.employmentStatus,
      employerINN: data.employerINN,
      salary: data.salary,
      position: data.position,
      workExperienceTotal: data.workExperienceTotal,
      workExperienceCurrent: data.workExperienceCurrent,
    },
    account: ACCOUNT_NUMBER,
  };
};