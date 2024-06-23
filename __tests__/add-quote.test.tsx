import { render, renderHook, screen } from "@testing-library/react"

import { AddQuote } from "@/components/add-quote"

describe("Add Quote", () => {
    it("Should render button", () => {
        render(<AddQuote />)

        const button = screen.getByRole("button", {
            name: /add quote/i
        })

        expect(button).toBeInTheDocument()
    })

    it("Should render plus icon", () => {
        render(<AddQuote />)

        const icon = screen.getByTestId("plus-icon")

        expect(icon).toBeInTheDocument()
    })
})
