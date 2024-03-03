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
                    text-purple-600
                    rounded
                    focus:ring-purple-600
                    ring-offset-gray-800 
                    focus:ring-2
                    bg-gray-700
                    border-gray-600
                    accent-purple-800
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
                            strikethrough ? 'text-gray-500' : 'text-gray-300',
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
