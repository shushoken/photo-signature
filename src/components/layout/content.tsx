import {ReactNode} from "react";

export function Content({children}: { children: ReactNode }) {
    return (
        <div className="relative text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
            {children}
        </div>
    );
}
