import LinePath from "./LinePath";
import { HexagonPoints, OctagonPoints, pointList, SquarePoints, TrianglePoints } from "./defaultPoints";
import { a, useChain, useSpring, useSpringRef } from '@react-spring/three';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatedRing } from "../basic/AnimatedLine";
// import { rotateShape } from "../../utils/Math";
// import { useCursor } from "../../utils/Hooks";


export type shapeArgs = Partial<{
    fillConfig: {
        color: number | string,
        opacity: number, 
        duration: number,
    },
    center: [number,number],
    factor: number,
    points: pointList,
    animate: boolean,
    delay: number,
    rotation: [number, number, number],
    onClick: () => void,
} & {
    [key: string]: any,
}>;


export function BaseShape({
    fillConfig={color: 'white', opacity: 0.5, duration: 1000},
    center=[0,0],
    factor=100,
    points=OctagonPoints,
    animate=true,
    delay=0,
    children,
    rotation=[0,0,0],
    onClick=undefined,
    ...props
} : shapeArgs){
    
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
        to: {opacity: fillConfig.opacity || 1},
        config: {duration: fillConfig.duration || 2000},
        pause: true,
    }), [center, factor, points]);


    // const [cursor, setCursor] = useCursor();
    

    return (
        <group onClick={onClick} onPointerEnter={() => onClick} onPointerLeave={() => onClick}>
            <LinePath 
                points={transformedPoints}
                miscOptions={
                    {onRest: () => {
                    numPoints.current++;                
                    if(numPoints.current === transformedPoints.length - 1)
                        springAPI.start({pause: false})
                    
                    props.onRest();
                    },
                    pause: !animate,
                    delay: delay,
                }}
                rotation={rotation}
 
                {...props}
            />
            <mesh geometry={polygonShape} onClick={onClick} rotation={rotation}>
                <a.meshStandardMaterial {...fillConfig} transparent opacity={spring.opacity}/>
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
    segments: number,
    duration: number,
    fillDuration: number,
    fillOpacity: number,
    thetaEnd: number,
    pauseFill: boolean,
    delayFillDuration: number,
    delay: number,
    successive: boolean,
} & {
    [key: string]: any,
}
>;


export function Ring({
    position=[0,0,0],
    radius=30,
    lineWidth=2,
    fill=false,
    segments=60,
    duration=1000,
    fillDuration=1000,
    fillOpacity=1,
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
            position={position}
            radius={radius}
            lineWidth={fillInSpring.lineThickness}
            segments={segments}
            thetaEnd={perimeterSpring.thetaEnd}
            targetOpacity={fillOpacity}
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


export const shapeMap : any[] = [
    BaseShape, Triangle, Square, Hexagon, Octagon, Ring,
]

