import { PrescopingFormData } from "./prescoringFormTypes";

export const formPrescoringData = (formData: PrescopingFormData) => {
  const processedData = { ...formData };
  processedData.firstName = processedData.firstName.trim();
  processedData.lastName = processedData.lastName.trim();
  processedData.middleName = processedData.middleName?.trim() || null;
  processedData.email = processedData.email.trim();

  if (!processedData.middleName) {
    processedData.middleName = null;
  }

  return processedData;
};

