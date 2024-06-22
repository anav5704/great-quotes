import { render, screen } from "@testing-library/react";

import { QuoteCard } from "@/components/quote-card";
import { user } from "@/__mocks__/user";
import { quote } from "@/__mocks__/quote";

describe("Quote Card", () => {
    it("Should render card", () => {
        render(<QuoteCard userId={user.id} quote={quote}/>)

        const quoteCard = screen.getByText(quote.content)

        expect(quoteCard).toBeInTheDocument()
    })

    it("Should have correct qoute", () => {
        render(<QuoteCard userId={user.id} quote={quote}/>)

        const quoteCard = screen.getByText(quote.content)

        expect(quoteCard).toHaveTextContent(quote.content)
    })
})
