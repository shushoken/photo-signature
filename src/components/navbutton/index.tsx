"use client";
import {Redirect} from "@/lib/types";
import {useRouter} from "next/navigation";


export function RedirectButton( {text, redirect}:{text: string, redirect: Redirect}){
    const router = useRouter();
    const buttonClasses =
        'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90';
    const handleClick = ()=>{
        console.log("test");
        switch (redirect) {
            case Redirect.KEY:
                router.push("/key");
                break;
            case Redirect.ENCRYPT:
                router.push("/encrypt");
                break;
            case Redirect.VERIFY:
                router.push("/verify");
                break;
            default:
                router.push("/")
        }
    }
    return (
    <button aria-label="Add to cart" className={buttonClasses} onClick={handleClick} >
            {text}
        </button>
    );
}
