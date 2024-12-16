import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { StarPoint } from "../assets/StarPoints";
import { randFloat, randInt } from "three/src/math/MathUtils.js";
import { useViewport } from "../utils/Hooks";
import { Mesh, MeshStandardMaterial } from "three";

export const STAR_COLORS : string[] = [
    "#9db4ff",
    "#a2b9ff",
    "#a7bcff",
    "#aabfff",
    "#afc3ff",
    "#baccff",
    "#c0d1ff",
    "#cad8ff",
    "#e4e8ff",
    "#edeeff",
    "#fbf8ff",
    "#fff9f9",
    "#fff5ec",
    "#fff4e8",
    "#fff1df",
    "#ffebd1",
    "#ffd7ae",
    "#ffc690",
    "#ffbe7f",
    "#ffbb7b",
    "#ffbb7b",
    "#D3D3D3",
]; //Length of 21 (22 with background but that doesnt count)

function getBounds(viewport: {width: number, height: number}, boundMultiplier: [number,number]): {x: [number, number], y:[number,number]}{
    let {width, height} = viewport;
    width = width * boundMultiplier[0];
    height = height * boundMultiplier[1];

    return {
        x: [-width, width],
        y: [-height, height],
    };
}

type StarsProps = {
    numStars?: number
    centerPosition?: [x: number, y: number, z: number],
    radiusRange?: [number,number],
    brightnessRange?: [number,number],
    brightnessOffsetRange?: [number, number],
    points?: number[] | number[][] | StarPoint,
    boundMultiplier?: [xBound: number, yBound: number],
    zPos?: number,
    useColors?: boolean,
    pointTransform?:(element: number | number[] | StarPoint) => StarPoint
};

type Star = {
    position: [x: number, y: number, z: number],
    radius: number,
    modifier: number,
    materialProps: {
        emissive: string | number,
        emissiveIntensity: number,
        emissiveTo: number
    }
};


const Stars = React.forwardRef<any, StarsProps>((props: StarsProps, ref) => {
    const {
        numStars=100,
        points=[],
        centerPosition=[0,0,0],
        radiusRange=[0.01, 1],
        brightnessRange=[0.25, 1.25],
        brightnessOffsetRange=[.05, 1], 
        boundMultiplier=[1,1],
        useColors=false,
        zPos=0,
        pointTransform=undefined,
    } = props;

    const size = useViewport();

    const stars = useMemo<Star[]>(() => {
        let parsedPoints: StarPoint[] = [];
        
        const bounds = getBounds(size, boundMultiplier);

        if(points.length > 0 && pointTransform){
            parsedPoints = points.map(e => pointTransform(e))
        }
        else{
            parsedPoints = new Array(numStars).fill(0).map(_ => ([
                randFloat(...bounds.x),
                randFloat(...bounds.y),
                randFloat(...radiusRange),
                useColors ? randInt(0,20) : 21,
                randFloat(...brightnessRange)
            ]));
        }

        console.log(parsedPoints);
        

        return parsedPoints.map(([x,y, radius, colorIndex, bright]) => ({
            position: [x,y, zPos],
            radius: radius,
            modifier: randInt(0, STAR_COLORS.length),
            materialProps: {
                emissive: STAR_COLORS[colorIndex],
                emissiveIntensity: bright,
                emissiveTo: bright + randFloat(...brightnessOffsetRange),
            }
        }));

    }, [size])
    
    const internalRef = useRef<any>();
    useFrame(({clock}) => {
        if(internalRef.current){
            const time = clock.getElapsedTime();
            const children: Mesh[] = internalRef.current?.children;
            
            
            for (let i = 0; i < children.length; i++) {
                const {position, radius, modifier, materialProps} = stars[i];
                const addendum = (Math.sin(time + modifier)*radius);
                children[i].position.x = position[0] + addendum;
                children[i].position.y = position[1] + addendum;
                
                // Adjust brightness
                (children[i].material as MeshStandardMaterial).emissiveIntensity = Math.abs(materialProps.emissiveTo * Math.sin(time)) + materialProps.emissiveIntensity;
                (children[i].material as MeshStandardMaterial).needsUpdate = true;
            }
        }
    })


    return (
        <group ref={ref}>
            <group ref={internalRef} position={centerPosition}>
                {
                    stars.map((e,i) => (
                        <mesh key={i} position={e.position}>
                            <sphereGeometry args={[e.radius]}/>
                            <meshStandardMaterial {...e.materialProps}/>
                        </mesh>
                    ))
                }
            </group>
        </group>
    );
});

export default Stars;