import { SpringConfig, useSprings } from "@react-spring/web";
import AnimatedLine, { lineArgs } from "../basic/AnimatedLine";

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
} & {
    [key: string]: any,
};



function LinePath({
    points=[], 
    lineDuration=1000, 
    lineOpacity=1.0,
    transitionDelay=100,
    transitionDelayModifier=1,
    lineWidth=2,
    from={opacity: 0}, 
    to={opacity: 1}, 
    config={},
    miscOptions={},
    ...props
} : Partial<linePathArgs>){

    const [paths] = useSprings(points.length - 1, i => ({
        from: {start: points[i], end: points[i], ...from},
        to: {start: points[i], end: points[i+1], ...to},
        delay: (i * lineDuration * transitionDelayModifier) + transitionDelay,
        config: {duration: lineDuration, ...config},
        ...miscOptions,
    }), [points]);

    return (
        <group>
            {
                paths.map((e,idx) => (<AnimatedLine
                    key={idx} 
                    opacity={lineOpacity}
                    lineWidth={lineWidth}
                    {...props}
                    {...e} 
                    />))
            }
        </group>
    );
}

export default LinePath;