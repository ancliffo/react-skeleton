import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "../pages/home";

const queryClient = new QueryClient();

describe("Home Page", () => {
  it("renders the Home Page header", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Home Page");
  });

  it("renders the Dog Fact subheader", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Dog Fact");
  });
});
