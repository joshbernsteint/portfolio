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

export type ringArgs = {
    position: [number, number, number],
    radius: number,
    lineWidth: number,
    segments: number,
    thetaEnd: number,
    materialProps: THREE.MeshBasicMaterialParameters,
    targetOpacity: number,
    meshProps: any,
    geometryProps: any
};


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

function _AnimatedRing({
    position=[0,0,0], 
    radius=30, 
    lineWidth=2, 
    segments=60,
    thetaEnd=0, 
    materialProps={color: 'white'},
    targetOpacity=1,
    meshProps={},
    geometryProps={},
    ...props
} : Partial<ringArgs>){
    return (
        <mesh position={position} {...props}>
            <ringGeometry args={[radius, radius-lineWidth, segments, segments, 0, thetaEnd]} {...geometryProps}/>
            <meshBasicMaterial transparent opacity={targetOpacity} {...materialProps} side={THREE.DoubleSide}/>
        </mesh>
    );
}

const AnimatedLine = animated(_AnimatedLine);
export const AnimatedRing = animated(_AnimatedRing);
export default AnimatedLine;