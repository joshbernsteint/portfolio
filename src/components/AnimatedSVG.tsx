import React, { useEffect, useMemo, useRef } from 'react';
import { a, useSprings } from '@react-spring/web';

const defaultPathArg = {
    strokeWidth: 1,
    stroke: "white",
    duration: 1000,
    fill: "transparent",
    endFillColor: "transparent",
    fillDuration: 1000,
    endLength: 0,
    reverseConfig: {
        duration: 1000,
        fillDuration: 1000,
    }
};

type PathArg = {
    d: string,
    length: number,
    strokeWidth?: number,
    stroke?: string,
    duration?: number,
    fill?: string,
    fillDuration?: number,
    endFillColor?: string,
    endLength?: number,
    reverseConfig?: {
        duration?: number,
        fillDuration?: number,
    },
};

export type AnimatedSVGProps = {
    paths: PathArg[],
    style?: React.CSSProperties
    visible?: boolean,
    width?: number | string,
    height?: number | string,
    viewBox?: string,
    autoStart?: boolean,
    [prop: string]: any,
};



export default function AnimatedSVG(ps: AnimatedSVGProps){
    const {
        width = 500, 
        height = 500,
        visible = false,
        autoStart = false,
        viewBox = "0 0 40 40",
        style = {},
         ...props
    } = ps;

    const currentlyVisible = useRef<boolean>(false);

    const paths = useMemo(() => {
        const p = props.paths || [];
        const result : PathArg[] = [];
        for (const el of p) {
            result.push({
                ...defaultPathArg,
                reverseConfig: {
                    ...el.reverseConfig,
                    ...defaultPathArg.reverseConfig,
                },
                ...el
            });
        }
        console.log(result);
        
        return result;
    }, [ps.paths]);    

    const [strokes, strokesAPI] = useSprings(paths.length, i => ({
        strokeDashOffset: paths[i].endLength,
        from: {
            strokeDashOffset: paths[i].length,
        },
        config: {duration: paths[i].duration},
        pause: !autoStart,
    }))
    
    const [fillings, fillingsAPI] = useSprings(paths.length, i => ({
        fill: paths[i].endFillColor,
        from: {
            fill: paths[i].fill,
        },
        pause: !autoStart,
        config: {duration: paths[i].fillDuration}
    }));

    useEffect(() => {
        if(visible){
            strokesAPI.start(i => ({pause: false, config: {duration: paths[i].duration}, reverse: currentlyVisible.current}));
            fillingsAPI.start(i => ({pause: false, reverse: currentlyVisible.current, config: {duration: paths[i].fillDuration}}))
            currentlyVisible.current = true;
        }
        else if(!visible && currentlyVisible.current){
            strokesAPI.start(i => ({pause: false, config: {duration: paths[i].reverseConfig?.duration}, reverse: true}));
            fillingsAPI.start(i => ({pause: false, reverse: true, config: {duration: paths[i].reverseConfig?.fillDuration}}))
        }
        
    }, [visible]);
    

    return (
        <svg width={width} height={height} viewBox={viewBox} style={style} version="1.2">
            {
                strokes.map((e,i) => (
                    <a.path key={i} 
                        fill={fillings[i].fill}
                        strokeWidth={paths[i].strokeWidth}
                        strokeDasharray={paths[i].length}
                        strokeDashoffset={e.strokeDashOffset}
                        d={paths[i].d}
                        stroke={paths[i].stroke}
                    />
                ))
            }
        </svg>
    );
};


