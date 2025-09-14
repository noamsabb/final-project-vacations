import { useEffect } from "react";

// Custom Hook - display document title: 
export function useTitle(title: string): void {
    useEffect(() => {
        document.title = title;
    }, []);
}
