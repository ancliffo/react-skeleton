import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function customRender(ui: React.ReactElement, { ...renderOptions } = {}) {
  const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };

  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
}

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    render: { ...customRender(jsx) },
  };
}

export * from "@testing-library/react";
export { setup };
