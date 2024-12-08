import { useEffect, useRef, useState } from "react";

export function useCursor(){
    const [cursor, setCursor] = useState(document.getElementById('root').style.cursor);
    useEffect(() => {
        document.getElementById('root').style.cursor = cursor;
    }, [cursor]);    

    return [cursor, setCursor];
}
