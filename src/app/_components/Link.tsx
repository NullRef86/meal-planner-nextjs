import { default as NextLink } from "next/link";
import { DefaultButtonClassName } from "./client-components/Button";

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    button?: boolean;
}

export default function Link({ children, href, button, ...props }: IProps) {
    return (
        <NextLink
            className={
                button ? DefaultButtonClassName : 'font-medium text-purple-600 hover:underline'
            }
            href={href}
        >
            {children}
        </NextLink>
    );
}