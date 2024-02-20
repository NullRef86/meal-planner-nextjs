import { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
    return (
        <main className="flex min-h-screen py-4 justify-center">
            <div className="lg:w-6/12 md:w-8/12 sm:w-full w-full px-8">
                {children}
            </div>
        </main>
    )
}