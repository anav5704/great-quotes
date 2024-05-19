import { Header } from "@/components"
import classNames from "classnames"

export const revalidate = 0

export default async function Home() {
    const user = true

    return (
        <main className={classNames(
            !user && "grid place-content-center",
            "pattern pt-[10vh] min-h-[90vh]",
        )}>
            <Header noMargin={!!!user}>
                Great  Quotes From <br /> Even Better People.
            </Header>
        </main >
    )
}