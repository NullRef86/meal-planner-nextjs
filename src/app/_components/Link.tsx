import { default as NextLink } from "next/link";

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export default function Link({ children, href, ...props }: IProps) {
    return (
        <NextLink
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            {...props}
            href={href}
        >
            {children}
        </NextLink>
    );
}