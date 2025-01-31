import LinePath from "./LinePath";
import { HexagonPoints, OctagonPoints, pointList, SquarePoints, TrianglePoints } from "./defaultPoints";
import { a, animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { AnimatedRing, ringArgs } from "../basic/AnimatedLine";
// import { rotateShape } from "../../utils/Math";
import { useCursor } from "../../utils/Hooks";


export type shapeArgs = Partial<{
    fillConfig: {
        color?: number | string,
    },
    center: [number,number],
    factor: number,
    lineColor?: string,
    points: pointList,
    animate: boolean,
    delay: number,
    rotation: [number, number, number],
    fillDuration?: number,
    fillOpacity?: number,
    springs?: boolean,
    onClick: () => void,
    onRest?: () => void,
} & {
    [key: string]: any,
}>;

const defaultFillConfig = {color: 'white', opacity: 0.5, duration: 1000}

export function BaseShape({
    fillConfig=defaultFillConfig,
    fillDuration=1000,
    fillOpacity=0.5,
    center=[0,0],
    factor=100,
    points=OctagonPoints,
    animate=true,
    lineColor="white",
    delay=0,
    children,
    rotation=[0,0,0],
    springs=true,
    onClick=undefined,
    onRest=undefined,
    ...props
} : shapeArgs){

    fillConfig = {...defaultFillConfig, ...fillConfig};
    
    const numPoints = useRef(0);
    const [transformedPoints, polygonShape] = useMemo<[[number, number, number][], THREE.ShapeGeometry]>(() => {        
        const [nx,ny] = center;
        const transformedPoints : [number, number, number][] = [];
        const vectorPoints = [];

        const pts = points;

        for (let i = 0; i < pts.length; i++) {
            const [x,y] = pts[i];
            const newPt : [number, number, number] = [(x*factor) + nx, (y*factor) + ny, 0];
            transformedPoints.push(newPt);
            vectorPoints.push(new THREE.Vector2(newPt[0], newPt[1]));
        }
        return [transformedPoints, new THREE.ShapeGeometry(new THREE.Shape(vectorPoints))];

    }, [center, factor, points]);


    
    const [spring, springAPI] = useSpring(() => ({
        from: {opacity: 0},
        to: {opacity: fillOpacity},
        config: {duration: fillDuration},
        pause: true,
    }), [center, factor, points]);


    const [_cursor, setCursor] = useCursor();
    

    return (
        <group onClick={onClick} onPointerEnter={() => onClick && setCursor('pointer')} onPointerLeave={() => onClick && setCursor('default')}>
            <LinePath 
                points={transformedPoints}
                miscOptions={
                    {onRest: () => {
                    numPoints.current++;                
                    if(numPoints.current === transformedPoints.length - 1 && springs)
                        springAPI.start({pause: false})
                    
                    onRest && onRest();
                    },
                    pause: !animate,
                    delay: delay,
                }}
                pathColor={lineColor}
                rotation={rotation}
 
                {...props}
            />
            <mesh geometry={polygonShape} onClick={onClick} rotation={rotation}>
                <a.meshStandardMaterial {...fillConfig} transparent opacity={springs ? spring.opacity : fillOpacity}/>
            </mesh>
            {children}
        </group>
    );
}

export function Hexagon(props : shapeArgs){
    return <BaseShape {...props} points={HexagonPoints}/>
}

export function Octagon(props : shapeArgs){
    return <BaseShape {...props} points={OctagonPoints}/>
}

export function Square(props : shapeArgs){
    return <BaseShape {...props} points={SquarePoints}/>
}

export function Triangle(props : shapeArgs){
    return <BaseShape {...props} points={TrianglePoints}/>
}


export type fullRingArgs = Partial<{
    position: [number, number, number],
    radius: number,
    lineWidth: number,
    fill: boolean,
    lineColor?: string,
    segments: number,
    duration: number,
    fillDuration: number,
    fillOpacity: number,
    thetaStart: number,
    thetaEnd: number,
    pauseFill: boolean,
    delayFillDuration: number,
    delay: number,
    successive: boolean,
    
} & ringArgs
>;


export function Ring({
    radius=30,
    lineWidth=2,
    fill=false,
    segments=60,
    duration=1000,
    lineColor="white",
    fillDuration=1000,
    fillOpacity=1,
    thetaStart=0,
    thetaEnd=2*Math.PI,
    pauseFill=false,
    delayFillDuration=(duration + 100),
    delay=0,
    successive=true,
    ...props
} : fullRingArgs){

    const [fillInSpring, fillAPI] = useSpring(() => ({
        from: {lineThickness: lineWidth},
        to: {lineThickness: fill ? radius : lineWidth},
        config: {duration: fillDuration},
        delay: successive ? 0 : delayFillDuration,
        pause: successive,
    }));


    const [perimeterSpring] = useSpring(() => ({
        from: {thetaEnd: 0},
        to: {thetaEnd: thetaEnd},
        config: {duration: duration},
        delay: delay,
        onRest: () => fillAPI.start({pause: false}),
    }));




    return (
        <AnimatedRing 
            radius={radius}
            lineWidth={fillInSpring.lineThickness}
            thetaStart={thetaStart}
            thetaEnd={perimeterSpring.thetaEnd}
            targetOpacity={fillOpacity}
            c={lineColor}
            {...props}
        />
    );
}

export enum ShapeTypes {
    BASE,
    TRIANGLE,
    SQUARE,
    HEXAGON,
    OCTAGON,
    RING,
};

export const AnimatedShapes : any = {
    Base: animated(BaseShape),
    Triangle: animated(Triangle),
    Square: animated(Square),
    Hexagon: animated(Hexagon),
    Octagon: animated(Octagon),
    Ring: animated(Ring),
};


export const shapeMap : any[] = [
    BaseShape, Triangle, Square, Hexagon, Octagon, Ring,
]

