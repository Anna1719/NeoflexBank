import { describe, test, expect } from "vitest";
import { validateDate } from "../validateDate";

describe("validateDate", () => {
  test("should return error if date is not in correct format", () => {
    const invalidDate = "12/25/2000";
    const result = validateDate(invalidDate);
    expect(result).toBe("Date must be in the format YYYY-MM-DD.");
  });

  test("should return error if date is invalid", () => {
    const invalidDate = "2022-02-35";
    const result = validateDate(invalidDate);
    expect(result).toBe("Invalid date");
  });

  test("should return error if the user is under 18", () => {
    const youngDate = "2010-12-25";
    const result = validateDate(youngDate);
    expect(result).toBe("You must be at least 18 years old.");
  });

  test("should return true for valid date of someone 18 or older", () => {
    const validDate = "2000-12-25";
    const result = validateDate(validDate);
    expect(result).toBe(true);
  });
});
