import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Table from "../ui/table";

interface RowData extends Record<string, unknown> {
  id: number;
  name: string;
  age: number;
}

const mockColumns: { key: keyof RowData; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
];

const mockData: RowData[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const mockOnSort = vi.fn();

describe("Table Component", () => {
  it("renders table with data and columns", () => {
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        onSort={mockOnSort}
        sortBy={{ key: "id", direction: "asc" }}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("calls onSort when a column header is clicked", () => {
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        onSort={mockOnSort}
        sortBy={{ key: "id", direction: "asc" }}
      />
    );

    const idHeader = screen.getByText("ID");

    fireEvent.click(idHeader);
    expect(mockOnSort).toHaveBeenCalledWith("id", "desc");
  });

  it("displays the correct sorting arrow", () => {
    const { rerender } = render(
      <Table
        data={mockData}
        columns={mockColumns}
        onSort={mockOnSort}
        sortBy={{ key: "id", direction: "asc" }}
      />
    );

    const arrowUp = screen.getAllByTestId("arrow-up");
    expect(arrowUp).toHaveLength(mockColumns.length);

    rerender(
      <Table
        data={mockData}
        columns={mockColumns}
        onSort={mockOnSort}
        sortBy={{ key: "id", direction: "desc" }}
      />
    );

    const arrowDown = screen.getByTestId("arrow-down");
    expect(arrowDown).toBeInTheDocument();
  });
});
