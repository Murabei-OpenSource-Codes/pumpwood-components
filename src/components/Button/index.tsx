import { ReactNode } from "react";
import { Button } from "../ui/button";

export default function PumpwoodButton({ children }: { children: ReactNode }) {
    return (
        <Button className="hover:cursor-pointer">
            {children}
        </Button>
    )
}