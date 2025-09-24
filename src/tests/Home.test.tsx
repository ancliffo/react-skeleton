import Home from "../pages/home/Home";
import { setup, screen } from "./test-utils";

describe("Home Page", () => {
  it("renders the Home Page header", () => {
    setup(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Dog Page");
  });

  it("renders the Dog Fact subheader", () => {
    setup(<Home />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Welcome to the home page!",
    );
  });
});
