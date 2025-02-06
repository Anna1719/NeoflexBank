import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorMessage } from "../ui/errorMessage";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { clearStore } from "@/store/store";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";

const mockNavigate = vi.fn();

vi.mock("@/store/store", () => ({
  clearStore: vi.fn(),
}));

const mockStore = legacy_createStore(() => ({
  currentStep: 1,
  applicationData: {},
}));

vi.mock("react-router-dom", async () => {
  const actualRouter = await vi.importActual("react-router-dom");
  return {
    ...actualRouter,
    useNavigate: () => mockNavigate,
  };
});

describe("ErrorMessage Component", () => {
  it("renders the correct title and subtitle", () => {
    render(
      <Provider store={mockStore}>
        <Router location="/" navigator={createMemoryHistory()}>
          <ErrorMessage />
        </Router>
      </Provider>
    );

    expect(
      screen.getByText("Oops! It seems server error has occured...")
    ).toBeInTheDocument();
    expect(
      screen.getByText("We suggest to go back. Sorry for the inconvenience.")
    ).toBeInTheDocument();
  });

  it("renders the button when rendered", () => {
    render(
      <Provider store={mockStore}>
        <Router location="/" navigator={createMemoryHistory()}>
          <ErrorMessage />
        </Router>
      </Provider>
    );

    const button = screen.getByText("View other offers of our bank");
    expect(button).toBeInTheDocument();
  });

  it("calls clearStore and navigate when the button is clicked", async () => {
    render(
      <Provider store={mockStore}>
        <Router location="/" navigator={createMemoryHistory()}>
          <ErrorMessage />
        </Router>
      </Provider>
    );

    const button = screen.getByText("View other offers of our bank");
    fireEvent.click(button);

    expect(clearStore).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith("/loan");
  });
});