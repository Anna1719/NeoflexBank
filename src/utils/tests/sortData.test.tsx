import { describe, test, expect } from "vitest";
import { sortData } from "../sortData";

const data = [
  { name: "John", age: 25 },
  { name: "Nik", age: 30 },
  { name: "Nadja", age: 20 },
];

describe("sortData", () => {
  test("should sort numbers in ascending order", () => {
    const sortedData = sortData(data, "age", "asc");

    expect(sortedData[0].age).toBe(20);
    expect(sortedData[1].age).toBe(25);
    expect(sortedData[2].age).toBe(30);
  });

  test("should sort numbers in descending order", () => {
    const sortedData = sortData(data, "age", "desc");

    expect(sortedData[0].age).toBe(30);
    expect(sortedData[1].age).toBe(25);
    expect(sortedData[2].age).toBe(20);
  });

  test("should sort strings in ascending order", () => {
    const sortedData = sortData(data, "name", "asc");

    expect(sortedData[0].name).toBe("John");
    expect(sortedData[1].name).toBe("Nadja");
    expect(sortedData[2].name).toBe("Nik");
  });

  test("should sort strings in descending order", () => {
    const sortedData = sortData(data, "name", "desc");

    expect(sortedData[2].name).toBe("John");
    expect(sortedData[1].name).toBe("Nadja");
    expect(sortedData[0].name).toBe("Nik");
  });
});
