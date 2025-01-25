import { render, screen } from "@testing-library/react";
import { Label } from "../ui/label";

describe("Label Component", () => {
  it("renders the label text correctly", () => {
    render(<Label text="Username" htmlFor="username" />);

    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders the required asterisk when 'required' is true", () => {
    render(<Label text="Username" htmlFor="username" required />);

    const asterisk = screen.getByText("*");
    expect(asterisk).toBeInTheDocument();
  });

  it("does not render the required asterisk when 'required' is false", () => {
    render(<Label text="Username" htmlFor="username" required={false} />);

    const asterisk = screen.queryByText("*");
    expect(asterisk).not.toBeInTheDocument();
  });
});