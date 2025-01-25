import { render, screen, fireEvent } from "@testing-library/react";
import { SuccessMessage } from "../ui/successMessage";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { clearStore } from "@/store/store";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actualRouter = await vi.importActual("react-router-dom");

  return {
    ...actualRouter,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/store/store", () => ({
  clearStore: vi.fn(),
}));

describe("SuccessMessage Component", () => {
  it("renders the correct title and subtitle", () => {
    render(
      <Router location="/" navigator={createMemoryHistory()}>
        <SuccessMessage
          title="Success"
          subtitle="Your operation was successful"
        />
      </Router>
    );

    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(
      screen.getByText("Your operation was successful")
    ).toBeInTheDocument();
  });

  it('renders the image and button when "final" is true', () => {
    render(
      <Router location="/" navigator={createMemoryHistory()}>
        <SuccessMessage
          title="Success"
          subtitle="Your operation was successful"
          final={true}
        />
      </Router>
    );

    const image = screen.getByAltText("Surprise");
    expect(image).toBeInTheDocument();

    const button = screen.getByText("View other offers of our bank");
    expect(button).toBeInTheDocument();
  });

  it("calls clearStore and navigate when the button is clicked", async () => {
    render(
      <Router location="/" navigator={createMemoryHistory()}>
        <SuccessMessage
          title="Success"
          subtitle="Your operation was successful"
          final={true}
        />
      </Router>
    );

    const button = screen.getByText("View other offers of our bank");
    fireEvent.click(button);

    expect(clearStore).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
