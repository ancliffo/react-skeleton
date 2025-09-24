import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { VitestMocker } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a test query client with disabled retries and caching for faster tests
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

function customRender(ui: React.ReactElement, { queryClient, ...renderOptions } = {}) {
  const testQueryClient = queryClient || createTestQueryClient();

  const Wrapper = ({ children }) =>
    React.createElement(QueryClientProvider, { client: testQueryClient }, children);

  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
}

function setup(jsx: React.ReactElement, options = {}) {
  return {
    user: userEvent.setup(),
    ...customRender(jsx, options),
  };
}

export const setupRouterMocks = (vi: VitestMocker) => {
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
};

export * from "@testing-library/react";
export { customRender as render, setup, createTestQueryClient };
