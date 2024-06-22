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

})
