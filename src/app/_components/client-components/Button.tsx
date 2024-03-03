'use client'

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react"
import { useFormStatus } from "react-dom"

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
    pendingText?: React.ReactNode;
}

export const DefaultButtonClassName = 'focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-3.5 py-2.5 bg-purple-600 hover:bg-purple-700 focus:ring-purple-900 flex gap-2 items-center';

export const Button = ({ children, pendingText, ...props }: IProps) => {
    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            className={`${DefaultButtonClassName} ${props.className} ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={pending}
            onClick={(e) => {
                e.stopPropagation();
                if (props.onClick) {
                    props.onClick(e);
                }

            }}
        >
            {
                pending
                    ? (pendingText ?? <FontAwesomeIcon icon={faSpinner} spin />)
                    : children
            }
        </button>
    )
}