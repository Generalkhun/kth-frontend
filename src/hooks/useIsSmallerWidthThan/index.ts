import { useState, useEffect } from "react";

const getIsSmallerWidthThan = (width: number) => window.innerWidth <= width;

export default function useIsSmallerWidthThan(width: number) {
    const [isSmallerWidthThan, setIsSmallerWidthThan] = useState(getIsSmallerWidthThan(width));

    useEffect(() => {
        const onResize = () => {
            setIsSmallerWidthThan(getIsSmallerWidthThan(width));
        }

        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);
    
    return isSmallerWidthThan;
}