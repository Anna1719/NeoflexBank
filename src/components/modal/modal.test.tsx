import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./ui/modal";
import { vi } from "vitest";

describe("Modal Component", () => {
  const onClose = vi.fn();
  const onDenyConfirm = vi.fn();
  const onGoHome = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders confirmation content when denied is false", () => {
    render(
      <Modal
        isOpen={true}
        denied={false}
        onClose={onClose}
        onDenyConfirm={onDenyConfirm}
      />
    );

    expect(screen.getByText(/Deny application/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to deny the application\?/i)
    ).toBeInTheDocument();

    expect(screen.getByTestId("deny-button")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-button")).toBeInTheDocument();
  });

  test("calls appropriate handlers on button clicks", () => {
    render(
      <Modal
        isOpen={true}
        denied={false}
        onClose={onClose}
        onDenyConfirm={onDenyConfirm}
      />
    );

    const denyButton = screen.getByTestId("deny-button");
    const cancelButton = screen.getByTestId("cancel-button");

    fireEvent.click(denyButton);
    fireEvent.click(cancelButton);

    expect(onDenyConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("renders denied content when denied is true", () => {
    render(
      <Modal isOpen={true} denied={true} onClose={onClose} onGoHome={onGoHome} />
    );

    expect(screen.getByText(/Deny application/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Your application has been denied/i)
    ).toBeInTheDocument();

    const goHomeButton = screen.getByRole("button", { name: /Go Home/i });
    fireEvent.click(goHomeButton);

    expect(onGoHome).toHaveBeenCalledTimes(1);
  });

  test("does not render when isOpen is false", () => {
    render(
      <Modal
        isOpen={false}
        denied={false}
        onClose={onClose}
        onDenyConfirm={onDenyConfirm}
      />
    );

    expect(screen.queryByText(/Deny application/i)).not.toBeInTheDocument();
  });
});
