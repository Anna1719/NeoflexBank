import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { FormFieldRenderer } from "./formFieldRenderer";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

const mockRegister = vi.fn();

const mockFieldInput = {
  id: "name",
  req: true,
  label: "Name",
  type: "text",
  placeholder: "Enter your name",
};

const mockFieldSelect = {
  id: "country",
  req: true,
  label: "Country",
  type: "select",
  options: [
    { label: "USA", value: "USA" },
    { label: "Canada", value: "Canada" },
  ],
};

describe("FormFieldRenderer", () => {
  it("renders an input field correctly", () => {
    const mockIsSubmitted = false;
    render(
      <FormFieldRenderer
        field={mockFieldInput}
        errors={{}}
        register={mockRegister as UseFormRegister<FieldValues>}
        isSubmitted={mockIsSubmitted}
      />
    );

    const input = screen.getByPlaceholderText("Enter your name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders a select field correctly", () => {
    const mockIsSubmitted = false;
    render(
      <FormFieldRenderer
        field={mockFieldSelect}
        errors={{}}
        register={mockRegister as UseFormRegister<FieldValues>}
        isSubmitted={mockIsSubmitted}
      />
    );

    const select = screen.getByLabelText(/Country/i);
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options.length).toBe(2);
    expect(options[0]).toHaveTextContent("USA");
    expect(options[1]).toHaveTextContent("Canada");
  });

  it("displays an error message when the field is invalid", () => {
    const mockIsSubmitted = true;
    const mockErrors: FieldErrors<FieldValues> = {
      name: { message: "This field is required", type: "required" },
    };

    render(
      <FormFieldRenderer
        field={mockFieldInput}
        errors={mockErrors as FieldErrors<FieldValues>}
        register={mockRegister as UseFormRegister<FieldValues>}
        isSubmitted={mockIsSubmitted}
      />
    );

    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
  });
});
