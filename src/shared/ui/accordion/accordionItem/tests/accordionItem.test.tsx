import { render, screen, fireEvent } from "@testing-library/react";
import { AccordionItem } from "../ui/accordionItem";
import { vi } from "vitest";

describe("AccordionItem Component", () => {
  const mockOnClick = vi.fn();

  const accItem = {
    title: "Test Title",
    content: <div>Test Content</div>,
  };

  it("renders the title correctly", () => {
    render(
      <AccordionItem accItem={accItem} onClick={mockOnClick} isOpen={false} />
    );

    expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
  });

  it("shows the content when opened", () => {
    render(
      <AccordionItem accItem={accItem} onClick={mockOnClick} isOpen={true} />
    );

    expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
  });

  it("toggles the icon and calls onClick when clicked", () => {
    const { rerender } = render(
      <AccordionItem accItem={accItem} onClick={mockOnClick} isOpen={false} />
    );

    expect(screen.getByRole("button")).toContainElement(
      screen.getByTestId("expend-down")
    );

    fireEvent.click(screen.getByRole("button"));

    expect(mockOnClick).toHaveBeenCalled();

    rerender(
      <AccordionItem accItem={accItem} onClick={mockOnClick} isOpen={true} />
    );

    expect(screen.getByRole("button")).toContainElement(
      screen.getByTestId("expend-up")
    );
  });
});
