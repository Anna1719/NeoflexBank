import { describe, test, expect } from "vitest";
import { formPrescoringData } from "../prescoringDataReshape";
import { PrescopingFormData } from "../prescoringFormTypes";

describe("formPrescoringData", () => {
  test("should trim firstName, lastName, email and middleName", () => {
    const formData: PrescopingFormData = {
      amount: 50000,
      term: 12,
      firstName: "  John  ",
      lastName: "   Doe  ",
      middleName: "   Michael   ",
      email: "   john.doe@example.com  ",
      birthdate: "1990-01-01",
      passportSeries: "AB",
      passportNumber: "123456",
    };

    const processedData = formPrescoringData(formData);

    expect(processedData.firstName).toBe("John");
    expect(processedData.lastName).toBe("Doe");
    expect(processedData.middleName).toBe("Michael");
    expect(processedData.email).toBe("john.doe@example.com");
  });

  test("should set middleName to null if it's empty", () => {
    const formData: PrescopingFormData = {
      amount: 50000,
      term: 12,
      firstName: "John",
      lastName: "Doe",
      middleName: "",
      email: "john.doe@example.com",
      birthdate: "1990-01-01",
      passportSeries: "AB",
      passportNumber: "123456",
    };

    const processedData = formPrescoringData(formData);

    expect(processedData.middleName).toBeNull();
  });

  test("should handle cases where some fields have no spaces", () => {
    const formData: PrescopingFormData = {
      amount: 50000,
      term: 12,
      firstName: "John",
      lastName: "Doe",
      middleName: "Michael",
      email: "john.doe@example.com",
      birthdate: "1990-01-01",
      passportSeries: "AB",
      passportNumber: "123456",
    };

    const processedData = formPrescoringData(formData);

    expect(processedData.firstName).toBe("John");
    expect(processedData.lastName).toBe("Doe");
    expect(processedData.middleName).toBe("Michael");
    expect(processedData.email).toBe("john.doe@example.com");
  });
});
