import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Header } from '@/components/header';

describe('Header', () => {
    it('Should render h1 with text', () => {
        render(<Header>Hello World</Header>);

        const heading = screen.getByRole('heading', {
            level: 1,
        });

        expect(heading).toBeInTheDocument();
    });

    it('Should have correct text', () => {
        render(<Header>Hello World</Header>);

        const heading = screen.getByRole('heading', {
            level: 1,
        });

        expect(heading).toHaveTextContent('Hello World');
    });
});
