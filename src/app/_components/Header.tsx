import { PropsWithChildren } from "react";
import Link from "./Link";

interface IProps extends PropsWithChildren {
    backUrl?: string;
}
export default function Header({ children, backUrl }: IProps) {
    return (
        <div className="flex justify-between items-center pb-3">
            <h1 className="font-bold text-3xl">
                {children}
            </h1>
            {
                backUrl
                && (
                    <Link href={backUrl}>
                        Back
                    </Link>
                )
            }
        </div>
    )
}