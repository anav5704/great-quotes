import { render, screen } from "@testing-library/react";

import { CreateAccount } from "@/components/create-account";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react");

describe("Create Account", () => {
    it("shoud render button", () => {
        render(<CreateAccount />)

        const button = screen.getByRole("button", {
            name: /create account/i
        })

        expect(button).toBeInTheDocument()
    })

    it("shoud render google icon", () => {
        render(<CreateAccount />)

        const icon = screen.getByRole("img", {
            name: /google/i
        })

        expect(icon).toBeInTheDocument()
    })

    it("shoud call sign in function with google", async () => {
        render(<CreateAccount />)

        const button = screen.getByRole("button", {
            name: /create account/i
        })

        const user = userEvent.setup()
        await user.click(button)

        expect(signIn).toHaveBeenCalledWith("google")
    })
})
