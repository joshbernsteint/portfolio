import { useEffect, useState } from "react";

export function useCursor() : [string, (newPointer: string) => void]{
    const [cursor, setCursor] = useState(document.getElementById('root')?.style.cursor || "default");
    useEffect(() => {
        const element = document.getElementById('root')
        if(element)
            element.style.cursor = cursor;
    }, [cursor]);    

    return [cursor, setCursor];
}
