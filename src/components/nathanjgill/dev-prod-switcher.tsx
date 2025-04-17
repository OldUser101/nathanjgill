import Link from "next/link";

export type Branch = "prod" | "dev";

export interface DevProdSwitcherProps {
    branch: Branch;
    className?: string;
};

export function DevProdSwitch({ branch, className }: DevProdSwitcherProps) {
    return (
        branch === "prod"? 
            <Link href="https://dev.nathanjgill.uk" className={className}>Switch to beta</Link>
            :<Link href="https://nathanjgill.uk" className={className}>Switch to production</Link>     
    );
}