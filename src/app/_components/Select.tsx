import { faUpDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react";

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement>, PropsWithChildren {
}

export const Select = ({ children, ...props }: IProps) => {
    return (
        <div className="grid">
            <select
                className={`
                    appearance-none
                    row-start-1
                    col-start-1 
                    bg-gray-50 
                    border
                    border-gray-300
                    text-gray-900
                    text-sm
                    rounded-lg
                    focus:ring-blue-500
                    focus:border-blue-500
                    block
                    w-full
                    p-2.5
                    dark:bg-gray-700
                    dark:border-gray-600
                    dark:placeholder-gray-400
                    dark:text-white
                    dark:focus:ring-blue-500
                    dark:focus:border-blue-500
            `}
                {...props}
            >
                {children}
            </select>

            <svg className="pointer-events-none right-1 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}