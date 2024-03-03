import classNames from "classnames";
import { PropsWithChildren, ReactElement, useId, useRef } from "react";

interface IProps extends PropsWithChildren, React.InputHTMLAttributes<HTMLInputElement> {
    strikethrough?: boolean;
}

export default function Checkbox({ strikethrough, children, ...props }: IProps) {
    const id = useId();

    return (
        <>
            <input
                id={id}
                type="checkbox"
                className="
                    w-4
                    h-4
                    text-blue-600
                    bg-gray-100
                    border-gray-300
                    rounded
                    focus:ring-blue-500
                    dark:focus:ring-blue-600
                    dark:ring-offset-gray-800 
                    focus:ring-2
                    dark:bg-gray-700
                    dark:border-gray-600
                "
                {...props}
            />
            {
                children
                && (
                    <label
                        htmlFor={id}
                        className={classNames([
                            'm-2',
                            'text-lg',
                            'font-medium',
                            strikethrough ? 'text-gray-500' : 'text-gray-900',
                            strikethrough ? 'text-gray-500' : 'dark:text-gray-300',
                            'w-full',
                            'cursor-pointer',
                            strikethrough && 'line-through'
                        ])
                        }
                    >
                        {children}
                    </label>
                )
            }
        </>
    );
};
