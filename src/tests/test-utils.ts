import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentType, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function customRender(ui: React.ReactElement, { ...renderOptions } = {}) {
    const Wrapper = ({ children }: PropsWithChildren) => {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    };

    return render(ui, {
        wrapper: Wrapper as ComponentType, 
        ...renderOptions,
    });
}

function setup(jsx: React.ReactElement) {
    return {
        user: userEvent.setup(),
        render: { ...customRender(jsx) },
    };
}

export * from '@testing-library/react';
export { setup };