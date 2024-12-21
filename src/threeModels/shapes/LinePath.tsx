import { SpringConfig, useSprings } from "@react-spring/web";
import AnimatedLine, { lineArgs } from "../basic/AnimatedLine";
import { useRef } from "react";

export type linePathArgs = {
    points: [number, number, number][],
    lineDuration: number,
    lineOpacity: number,
    transitionDelay: number,
    transitionDelayModifier: number,
    lineWidth: number,
    from: Partial<lineArgs>,
    to: Partial<lineArgs>,
    config: Partial<SpringConfig>,
    miscOptions: any,
    loop?: boolean,
    pathColor?: string,
} & {
    [key: string]: any,
};



function LinePath({
    points=[], 
    pathColor="white",
    lineDuration=1000, 
    lineOpacity=1.0,
    transitionDelay=0,
    transitionDelayModifier=1,
    lineWidth=2,
    from={opacity: 0}, 
    to={opacity: 1}, 
    config={},
    miscOptions={},
    loop=false,
    ...props
} : Partial<linePathArgs>){

    const loopRef = useRef<{counter: number, reverse: boolean}>({counter: 0, reverse: false});
    const [paths, pathsAPI] = useSprings(points.length - 1, i => ({
        from: {start: points[i], end: points[i], ...from},
        to: {start: points[i], end: points[i+1], ...to},
        delay: (i * lineDuration * transitionDelayModifier) + transitionDelay,
        config: {duration: lineDuration, ...config},
        onRest: loop && (() => {
            loopRef.current.counter++;
            if(loopRef.current.counter >= points.length - 1){
                loopRef.current.reverse = !loopRef.current.reverse;
                loopRef.current.counter = 0;
                pathsAPI.start((i: number) => ({reverse: true, delay: loopRef.current.reverse ? 
                    ((points.length-2-i) * lineDuration * transitionDelayModifier) : (i * lineDuration * transitionDelayModifier)}));
            }
        }),
        ...miscOptions,
    }), [points]);

    return (
        <group>
            {
                paths.map((e,idx) => (<AnimatedLine
                    key={idx} 
                    opacity={lineOpacity}
                    lineWidth={lineWidth}
                    color={pathColor}
                    {...props}
                    {...e} 
                    />))
            }
        </group>
    );
}

export default LinePath;