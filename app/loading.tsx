import { Spinner } from '@nextui-org/spinner'

export default function loading() {
    return (
        <main className="flex pt-[10vh] h-[90vh] flex-col items-center justify-center text-white">
            <Spinner size="lg" />
        </main>
    )
}
