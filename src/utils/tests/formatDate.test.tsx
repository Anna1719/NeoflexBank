import { describe, test, expect } from "vitest";
import { formatDate } from "../formatters";

describe("formatDate", () => {
  test("should format date correctly for YYYY-MM-DD format", () => {
    const input = "20210101";
    const result = formatDate(input);
    expect(result).toBe("2021-01-01");
  });

  test("should handle input with extra characters", () => {
    const input = "20-21*01#01";
    const result = formatDate(input);
    expect(result).toBe("2021-01-01");
  });

  test("should return empty string when input is empty", () => {
    const input = "";
    const result = formatDate(input);
    expect(result).toBe("");
  });
});