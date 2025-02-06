import { describe, test, expect } from "vitest";
import { formatDivisionCode } from "../formatters";

describe("formatDivisionCode", () => {
  test("should format division code as XXX-XXX", () => {
    const input = "123456";
    const result = formatDivisionCode(input);
    expect(result).toBe("123-456");
  });

  test("should handle input with non-digit characters", () => {
    const input = "12@345*";
    const result = formatDivisionCode(input);
    expect(result).toBe("123-45");
  });

  test("should return empty string when input is empty", () => {
    const input = "";
    const result = formatDivisionCode(input);
    expect(result).toBe("");
  });
});