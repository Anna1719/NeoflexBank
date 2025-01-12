type SortDirection = "asc" | "desc";

export function sortData<T>(
  data: T[],
  key: keyof T,
  direction: SortDirection
): T[] {
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });
}
