import { describe, it, expect } from "vitest";
import Demo from "../../../pages/demo";
import { render, screen } from "../../test-utils";

describe("Demo Page", () => {
  it("renders the Counter Page heading", () => {
    render(<Demo />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Counter Page");
  });
});
