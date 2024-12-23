import { animated } from "@react-spring/web";
import { Line } from "@react-three/drei";
import * as THREE from "three";

export type lineArgs = {
    start: [number, number, number],
    end: [number, number, number],
    color: string | number,
    lineWidth: number,
    opacity: number,
};

export type ringArgs = Partial<{
    position: [number, number, number],
    radius: number,
    lineWidth: number,
    segments: number,
    thetaStart?: number,
    thetaEnd: number,
    targetOpacity: number,
    meshProps: any,
    geometryProps: any
    c?: string,
}>;


function _AnimatedLine({start=[0,0,0], end=[0,0,0], color="white", lineWidth=2, opacity=1,...props} : Partial<lineArgs>){
    return (
        <Line 
            points={[start, end]} 
            color={color} 
            lineWidth={lineWidth}
            transparent={opacity !== 1}
            opacity={opacity} {...props}
        />
    );
}

export function NRing({
    position=[0,0,0], 
    radius=30, 
    lineWidth=2, 
    segments=60,
    thetaStart=0,
    c="white",
    thetaEnd=0, 
    targetOpacity=1,
    meshProps={},
    geometryProps={},
    ...props
} : ringArgs){
    return (
        <mesh position={position} {...props}>
            <ringGeometry args={[radius, radius-lineWidth, segments, segments, thetaStart, thetaEnd]} {...geometryProps}/>
            <meshBasicMaterial transparent opacity={targetOpacity} color={c} side={THREE.DoubleSide}/>
        </mesh>
    );
}

const AnimatedLine = animated(_AnimatedLine);
export const AnimatedRing = animated(NRing);
export default AnimatedLine;