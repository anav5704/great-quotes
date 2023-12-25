import QuoteModal from "./components/quote-modal";

export default async function Home() {
    return (
        <main className="text-6xl flex pt-[10vh] h-[100vh] flex-col items-center justify-center text-white">
            hello world
            <QuoteModal />
        </main>
    );
}
