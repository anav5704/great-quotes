import { Meta, StoryObj } from '@storybook/react'
import { QuoteCard } from "@/components"
import { quote } from "@/__mocks__/quote"
import { user } from "@/__mocks__/user"

const meta: Meta<typeof QuoteCard> = {
    title: "Components/Quote Card",
    component: QuoteCard,
}

export default meta

type Story = StoryObj<typeof QuoteCard>

export const Default: Story = {
    args: {
        quote,
        userId: user.id,
    }
}