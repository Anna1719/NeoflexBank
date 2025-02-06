import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Checkbox } from "../ui/checkbox";
import { vi } from "vitest";

describe("Checkbox Component", () => {
  it("renders the checkbox with the correct label", () => {
    render(
      <Checkbox
        checked={false}
        onChange={() => {}}
        label="Accept terms"
        id="terms"
      />
    );

    const checkboxLabel = screen.getByText("Accept terms");
    expect(checkboxLabel).toBeInTheDocument();

    const checkboxInput = screen.getByRole("checkbox");
    expect(checkboxInput).not.toBeChecked();
  });

  it("calls onChange when the checkbox is clicked", async () => {
    const onChangeMock = vi.fn();

    render(
      <Checkbox
        checked={false}
        onChange={onChangeMock}
        label="Accept terms"
        id="terms"
      />
    );

    const checkboxInput = screen.getByRole("checkbox");

    fireEvent.click(checkboxInput);

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith(true);
    });
  });

  it("renders the checkbox as checked when checked prop is true", () => {
    render(
      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Accept terms"
        id="terms"
      />
    );

    const checkboxInput = screen.getByRole("checkbox");

    expect(checkboxInput).toBeChecked();
  });

  it("renders the checkbox as unchecked when checked prop is false", () => {
    render(
      <Checkbox
        checked={false}
        onChange={() => {}}
        label="Accept terms"
        id="terms"
      />
    );

    const checkboxInput = screen.getByRole("checkbox");

    expect(checkboxInput).not.toBeChecked();
  });
});
