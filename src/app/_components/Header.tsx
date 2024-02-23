import { PropsWithChildren } from "react";
import Link from "./Link";
import { Button } from "./client-components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface IProps extends PropsWithChildren {
    backUrl?: string;
    onCancel?: () => void;
}
export default function Header({ children, backUrl, onCancel }: IProps) {
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
            {
                onCancel
                && (
                    <Button onClick={onCancel}>
                        <FontAwesomeIcon icon={faTimes} className="text-xl" />
                    </Button>
                )
            }
        </div>
    )
}