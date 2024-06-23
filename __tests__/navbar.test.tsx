import { render, screen } from "@testing-library/react";

import { Navbar } from "@/components/navbar";

describe("Navbar", () => {
    it("Should render nav", () => {
        render(<Navbar />)

        const navbar = screen.getByRole("navigation")

        expect(navbar).toBeInTheDocument()
    })

    it("Should have correct text", () => {
        render( <Navbar /> )

        const navbar = screen.getByRole("navigation")

        expect(navbar).toHaveTextContent(/great quotes/i)
    })

    it("Should have link to source code", () => {
        render(<Navbar />)

        const link = screen.getByRole("link", {
            name: /github/i
        })

        expect(link).toHaveAttribute("href", "https://github.com/anav5704/great-quotes")
    })
})
