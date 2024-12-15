import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

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

export function useMeasure(){
    const ref = useRef();
    const [dimensions, setDimensions] = useState<{height: number, width: number}|undefined>(undefined);

    useEffect(() => {
        if(ref.current){
            const current : {clientHeight: number, clientWidth: number} = ref.current;
            setDimensions({height: current.clientHeight, width: current.clientWidth})
        }
    }, [ref.current]);


    return {ref, dimensions};
}

export function useViewport(){
    const get = useThree(state => state.get);
    const [size, setSize] = useState<{height: number, width: number, aspect: number}>({height: 0, width: 0, aspect: 0});
    
    useEffect(() => {
        const resizeHandler = () => {
            const {width, height, aspect} = get().viewport;
            setSize((cur) => (width !== cur.width || height !== cur.height) ? {height: height, width: width, aspect: aspect} : cur)
        }
        resizeHandler();
        
        // Only check the dimensions when the window changes size
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
     }, []);

     return size;
}