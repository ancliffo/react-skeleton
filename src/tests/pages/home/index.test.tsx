import { describe, it, expect } from "vitest";
import Home from "../../../pages/home";
import { render, screen } from "../../test-utils";

describe("Home Page", () => {
  it("renders the Welcome to MERIDIAN title", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Welcome to MERIDIAN!");
  });

  it("renders all navigation boxes", () => {
    render(<Home />);
    expect(screen.getByText("T&E")).toBeInTheDocument();
    expect(screen.getByText("TOR/EMAF")).toBeInTheDocument();
    expect(screen.getByText("Staff Management")).toBeInTheDocument();
    expect(screen.getByText("CS")).toBeInTheDocument();
    expect(screen.getByText("WIMS")).toBeInTheDocument();
    expect(screen.getByText("CSAT")).toBeInTheDocument();
  });
});
