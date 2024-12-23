import { useMemo } from "react";
import { useHover } from "../../utils/Hooks";
import { position, rotation } from "../../utils/types";
import { pointList, SquarePoints } from "./defaultPoints";
import * as THREE from 'three';
import { Line } from "@react-three/drei";
import { animated } from "@react-spring/three";

export type NoAnimateShapeArgs = {
    position?: position
    points?: pointList,
    rotation?: rotation,
    factor?: number,
    fill?: boolean,
    fillOpacity?: number,
    fillColor?: string,
    lineColor?: string,
    lineWidth?: number,
    onClick?: () => void,
};

export function BaseShape(props: NoAnimateShapeArgs){
    const {
        points=SquarePoints, 
        position=[0,0,0], 
        rotation=[0,0,0], 
        onClick=undefined, 
        factor=100,
        fillOpacity=1,
        fillColor='white',
        fill=false,
        lineColor='white',
        lineWidth=2,
    } = props;

    const hover = useHover(onClick ? "pointer" : "disabled");

    const [pointGroups, polygonShape] = useMemo<[[position,position][], THREE.ShapeGeometry]>(() => {        
        const [nx,ny, nz] = position;
        const transformedPoints : position[] = [];
        const vectorPoints = [];

        const pts = points;

        for (let i = 0; i < pts.length; i++) {
            const [x,y] = pts[i];
            const newPt : position = [(x*factor) + nx, (y*factor) + ny, nz];
            transformedPoints.push(newPt);
            vectorPoints.push(new THREE.Vector2(newPt[0], newPt[1]));
        }

        const pointGroups : [position,position][] = [];

        for (let i = 0; i < transformedPoints.length - 1; i++) {
            pointGroups.push([transformedPoints[i], transformedPoints[i+1]]);
        }

        return [pointGroups, new THREE.ShapeGeometry(new THREE.Shape(vectorPoints))];

    }, [position, factor, points]);
    

    return (
        <group {...hover}>
            {
                pointGroups.map((e,i) => (
                    <Line 
                        key={i}
                        points={e}
                        color={lineColor}
                        lineWidth={lineWidth}
                        rotation={rotation}
                    />
                ))
            }
            {fill && (
                <mesh geometry={polygonShape} onClick={onClick} rotation={rotation}>
                    <meshStandardMaterial color={fillColor} transparent opacity={fillOpacity}/>
                </mesh>
            )}
        </group>
    );
}

export const AnimatedBaseShape = animated(BaseShape);