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


export function useWindow(){
    function getDimensions() : {width: number, height: number}{
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    const [dimensions, setDimensions] = useState(getDimensions());

    useEffect(() => {
        function handleResize(){
            setDimensions(getDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return dimensions;
}