'use client'

import { PropsWithChildren, ReactNode, createContext, useState } from "react";
import Header from "./Header";
import cn from "classnames";

interface IModalData {
    title: ReactNode;
    content: ReactNode;
}

interface IModalContext {
    show: (data: IModalData) => void;
    hide: () => void;
}

export const ModalContext = createContext<IModalContext>(undefined!);

export default function Main({ children }: PropsWithChildren) {
    const [modalData, setModalData] = useState<IModalData>();

    const defaultContainerClasses = 'pt-4 lg:w-1/2 md:w-3/4';

    return (
        <ModalContext.Provider value={
            {
                show: setModalData,
                hide: () => setModalData(undefined)
            }
        }>
            <main
                className={cn(
                    'container',
                    defaultContainerClasses
                )}
            >
                {children}
            </main>

            {
                modalData
                && (
                    <div className="fixed top-0 w-full h-full bg-black bg-opacity-50">
                        <div
                            className={cn(
                                'container',
                                defaultContainerClasses,
                                'border rounded-lg bg-black'
                            )}
                        >
                            <Header onCancel={() => { setModalData(undefined) }}>
                                {modalData.title}
                            </Header>
                            {modalData.content}
                        </div>
                    </div>
                )
            }
        </ModalContext.Provider>
    )
}