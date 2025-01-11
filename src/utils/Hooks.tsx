import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useCursor() : [string, (newPointer: string) => void]{
    const [cursor, setCursor] = useState(document.getElementById('root')?.style.cursor || "default");
    useEffect(() => {
        const element = document.getElementById('root')
        if(element)
            element.style.cursor = cursor;
    }, [cursor]);    

    return [cursor, setCursor];
}


type windowDimensions = {width: number, height: number, aspect: number};
export function useWindow(onChange?: (dimensions: windowDimensions) => void){
    function getDimensions() : windowDimensions{
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            aspect: window.innerWidth/window.innerHeight,
        };
    }

    const [dimensions, setDimensions] = useState(getDimensions());

    useEffect(() => {
        function handleResize(){
            const dim = getDimensions();
            setDimensions(dim);
            onChange && onChange(dim);
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
    const viewport = get().viewport;
    const [size, setSize] = useState<{height: number, width: number, aspect: number}>({height: 0, width: 0, aspect: 0});
    
    useEffect(() => {
        const {width, height, aspect} = viewport;
        
        setSize((cur) => (width !== cur.width || height !== cur.height) ? {height: height, width: width, aspect: aspect} : cur);
     }, [viewport]);

    return size;
}

export function useHover(cursorType: string, onHoverStart: () => void = ()=>{}, onHoverEnd: () => void = () => {}): {
    onPointerEnter?: () => void,
    onPointerLeave?: () => void,
}{
    const [_cursor, setCusor] = useCursor();
    if(cursorType === "disabled"){
        return {};
    }
    return {
        onPointerEnter: () => {setCusor(cursorType); onHoverStart()},
        onPointerLeave: () => {setCusor('default'); onHoverEnd()},
    };
}

type useFPSArgs = {
    target: number,
    failTries: number,
    onFail: (fps?: number) => void,
};

const useFPSDefaults : useFPSArgs = {target: 30, failTries: 5, onFail: () => {}};

export function useFPS(options: Partial<useFPSArgs> = useFPSDefaults){
    const {target, failTries, onFail} = {...useFPSDefaults, ...options};
    const failed = useRef<number>(0);

    useFrame(({clock}) => {
        if(failed.current < failTries){
            const fps = 1/clock.getDelta();
            if(fps < target){
                failed.current++;
            }
            if(failed.current >= failTries){
                onFail(fps);
            }
        }
    })
}



export function useScroll(targetPercent: number, onFire: (scrollPos?: number) => void = (() => {})) : boolean {
    const [fired, setFired] = useState(false);

    useEffect(() => {
        const trueHeight = document.getElementById('root')?.scrollHeight || window.innerHeight;
        function handler(this: Window, _e?: Event){
            const percentage = this.scrollY / trueHeight;
            if(!fired && percentage >= targetPercent){
                setFired(true);
                onFire(percentage);
                this.window.removeEventListener('scroll', handler);
            }
        }
        handler.call(window);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return fired;
}