import { render, screen } from "@testing-library/react";

import { QuoteControls } from "@/components/quote-controls";
import { user } from "@/__mocks__/user";
import { quote } from "@/__mocks__/quote";

describe("Quote Controls", () => {
    it("Should render controls", () => {
        render(<QuoteControls userId={user.id} quote={quote} />)

        const controls = screen.getByTestId("quote-controls")

        expect(controls).toBeInTheDocument()
    })

    it("Should show update and delete button if user is owner", () => {
        render(<QuoteControls userId={user.id} quote={quote} />)

        const updateButton = screen.getByRole("button", {
            name: /update quote/i
        })

        const deleteButton = screen.getByRole("button", {
            name: /delete quote/i
        })

        expect(updateButton).toBeInTheDocument()
        expect(deleteButton).toBeInTheDocument()
    })

    it("Should not show update and delete button if user is not owner", () => {
        render(<QuoteControls userId="---" quote={quote} />)

        const updateButton = screen.queryByRole("button", {
            name: /update quote/i
        })

        const deleteButton = screen.queryByRole("button", {
            name: /delete quote/i
        })

        expect(updateButton).not.toBeInTheDocument()
        expect(deleteButton).not.toBeInTheDocument()
    })
})
