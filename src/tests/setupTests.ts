import React from "react";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

// Global mocks that apply to all tests
vi.mock("@tanstack/react-router", () => ({
  Link: React.forwardRef(({ children, href, ...props }, ref) =>
    React.createElement("a", { ...props, href, ref }, children),
  ),
  useRouter: () => ({
    navigate: vi.fn(),
    state: { location: { pathname: "/" } },
  }),
  useRouterState: () => ({
    location: { pathname: "/" },
    matches: [],
  }),
  useNavigate: () => vi.fn(),
  useLinkProps: () => ({}),
}));
