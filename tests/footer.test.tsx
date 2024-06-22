import { render, screen } from "@testing-library/react";

import { Footer } from "@/components/footer";

describe("Footer", () => {
    it("Should render footer", () => {
        render(<Footer />)

        const footer = screen.getByRole("contentinfo")

        expect(footer).toBeInTheDocument()
    })

    it("Should have link to author", () => {
        render (<Footer />)

        const link = screen.getByRole("link", {
            name: /anav/i
        })

        expect(link).toHaveAttribute("href", "https://github.com/anav5704")
    })
})
