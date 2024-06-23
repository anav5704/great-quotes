import { render, screen } from "@testing-library/react";

import { CopyQuote } from "@/components/copy-quote";
import userEvent from '@testing-library/user-event'
import { user } from "@/__mocks__/user";
import { quote } from "@/__mocks__/quote";

describe("Copy Quote", () => {
    it("Should render copy button", () => {
        render (<CopyQuote author={user.name} content={quote.content} />)

        const button = screen.getByRole("button", {
            name: /copy quote/i
        })

        expect(button).toBeInTheDocument()
    })

    it("Should copy quote to clipboard", async () => {
        render (<CopyQuote author={user.name} content={quote.content} />)

        const button = screen.getByRole("button", {
            name: /copy quote/i
        })

        const mockUser = userEvent.setup()
        await mockUser.click(button)

        const copiedText = await window.navigator.clipboard.readText()
        expect(copiedText).toEqual(quote.content + " - " + user.name)
    })

    it("Should swap icon after copying", async () => {
        render (<CopyQuote author={user.name} content={quote.content} />)

        const button = screen.getByRole("button", {
            name: /copy quote/i
        })

        const mockUser = userEvent.setup()
        await mockUser.click(button)

        expect(screen.getByRole("img", { name: /check/i })).toBeInTheDocument();
    })

    it("Should swap icon back after delay", async () => {
        render (<CopyQuote author={user.name} content={quote.content} />)

        const button = screen.getByRole("button", {
            name: /copy quote/i
        })

        const mockUser = userEvent.setup()
        await mockUser.click(button)

        jest.useFakeTimers();
        await jest.advanceTimersByTimeAsync(2500);

        expect(screen.getByRole("img", { name: /check/i })).toBeInTheDocument();
    })
})
