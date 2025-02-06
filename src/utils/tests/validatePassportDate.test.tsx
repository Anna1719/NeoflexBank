import { describe, test, expect } from "vitest";
import { validatePassportDate } from "../validateDate";

describe("validatePassportDate", () => {
  test("should return error if date is not in correct format", () => {
    const invalidDate = "12/25/2000";
    const result = validatePassportDate(invalidDate);
    expect(result).toBe("Date must be in the format YYYY-MM-DD.");
  });

  test("should return error if date is invalid", () => {
    const invalidDate = "2022-02-35";
    const result = validatePassportDate(invalidDate);
    expect(result).toBe("Invalid date");
  });

  test("should return error if the passport issue date is in the future", () => {
    const futureDate = "2027-01-01";
    const result = validatePassportDate(futureDate);
    expect(result).toBe("Incorrect date of passport issue date");
  });

  test("should return true for valid passport issue date", () => {
    const validDate = "2020-12-25";
    const result = validatePassportDate(validDate);
    expect(result).toBeUndefined()
  });
});