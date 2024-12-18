import { useMemo, useRef, useState } from "react";
import { useRotate } from "../../utils/SpringHooks";
import LinePath from "../shapes/LinePath";
import { Hexagon, Octagon, Ring, ShapeTypes } from "../shapes/Shapes";
import {a, animated, useSpring} from '@react-spring/three';
import { Image, Line } from "@react-three/drei";
import stevensPNG from '../../assets/images/education/stevens.png';
import mahwahPNG from '../../assets/images/education/mahwah.png';
import { useHover } from "../../utils/Hooks";
import TextAndShapes from "../shapes/TextAndShapes";
import * as THREE from 'three';
import AnimatedSVG from "../../components/AnimatedSVG";
import ReactSVGPath from "../../assets/svg-paths/React";
import SVGThree from "../shapes/SVG";


const DateCircle = (props: {position: [number, number, number], date: [month: string, year: string] | []}) => (
    <TextAndShapes 
        position={props.position}
        shapes={[{type: ShapeTypes.RING, args: {
            radius: 20,
            lineWidth: 1,
            }},
            {type: ShapeTypes.OCTAGON, args: {
                factor: 20,
                rotation: [0,0,-Math.PI/8]
            }},
        ]}
        startPaused={false}
        text={[
            {centered: true, content: props.date[0], position: [0,4,0], textArgs: {depth: .1, size: 4}},
            {centered: true, content: props.date[1], position: [0,-5,0],  textArgs: {depth: .1, size: 4}},
        ]}
    />
)

type EducationBulbProps = {
    position: [x: number, y: number, z: number],
    spinClockwise?: boolean,
    startRotation?: [number,number,number],
    level: string,
    school: string,
    schoolUrl: string,
    schoolIcon?: {
        src: string,
        scale: [number,number] | number
    },
    startDate: [month: string, year: string],
    endDate: [month: string, year: string],
    gpa: string,
    inProgress?: boolean
    relevantCourses?: string[],
};

const AnimatedImage = animated(Image);

function EducationBulb(props: EducationBulbProps){
    const {
        position,
        spinClockwise=false,
        inProgress=false,
        startDate=[], 
        endDate=[],
        startRotation=[0,0,0],
        level,
        schoolUrl="https://www.stevens.edu/",
        schoolIcon={
            src: stevensPNG,
            scale: [98, 105]
        },
    } = props;

    const {rotate, counter} = useRotate(60, {clockwise: spinClockwise, startPaused: true, startRotation: startRotation});
    const [rotateProps, rotateAPI] = rotate;
    const [counterProps, counterAPI] = counter;


    const [lineCurve, linePoints] = useMemo(() => {
        const curve = new THREE.EllipseCurve(
            0,0,
            105,105,
            1.31*Math.PI, 1.69*Math.PI,
            false, 0
        )
        return [curve, curve.getPoints(50)];
    }, []);    

    const hoverObj = useHover('pointer');

    return (
        <group position={position}>
            <group>
                <TextAndShapes
                    position={[0,90,0]}
                    text={[
                        {
                            content: level,
                            centered: true,
                            textArgs: {depth: .01, size: 10}
                        }
                    ]}
                    // Rectangle
                    shapes={[
                        {
                            type: ShapeTypes.BASE,
                            args: {
                                points: [
                                    [-.5,-.1],
                                    [.5,-.1],
                                    [.5, .1],
                                    [-.5, .1],
                                    [-.5, -.1]
                                ]
                            }
                        }
                    ]}
                
                />
                {/* <Ring 
                    position={[-75,-75,0]}
                    radius={20}
                    lineWidth={1}
                /> */}
                <DateCircle position={[-75, -75, 0]} date={startDate}/>
                <DateCircle position={[75, -75, 0]} date={endDate}/>
                <Line 
                    position={[0,0,0]}
                    points={linePoints}
                    color={'white'}
                    lineWidth={2}
                    transparent
                    opacity={0}
                />
                <Ring 
                    radius={105}
                    lineWidth={1}
                    thetaStart={1.31 * Math.PI}
                    thetaEnd={Math.PI/2.635}
                />
                

            </group>
            <a.group  {...rotateProps} {...hoverObj}>
                <Hexagon factor={75} fillConfig={{color: 'black'}}/>
                <Hexagon rotation={[0,0,-Math.PI/2]} factor={75} onRest={() => {
                    rotateAPI.start({pause: false});
                    counterAPI.start({pause: false});
                }}
                />
                <AnimatedImage 
                    url={schoolIcon.src}
                    scale={schoolIcon.scale}
                    radius={0}
                    position={[0,0,.1]}
                    transparent
                    opacity={1}
                    onClick={() => {
                        window.open(schoolUrl, '_blank')
                    }}
                    {...counterProps}
                />
            </a.group>
        </group>
    );
}

export default function EducationThree(props: any){

    return (
        <>
            <EducationBulb
                position={[-250,-10,0]}
                level="High School"
                startDate={["September", "2017"]}
                endDate={["June", "2021"]}
                schoolIcon={{
                    src: mahwahPNG,
                    scale: 90
                }}
                schoolUrl="https://hs.mahwah.k12.nj.us/"
            />
            <EducationBulb 
                position={[50,-80,0]}
                startDate={["September", "2021"]}
                endDate={["May", "2024"]}
                level="Bachelor's"
                startRotation={[0,0,-Math.PI/4]} 
                schoolUrl="https://www.stevens.edu/"
                spinClockwise
                />
            <EducationBulb 
                position={[275,20,0]} 
                startDate={["September", "2024"]}
                endDate={["May", "2025"]}
                startRotation={[0,0,Math.PI/3]}
                level="Master's"
                schoolUrl="https://www.stevens.edu/"
                inProgress
                />
            {/* <LinePath 
                points={[[-250,-10,0], [50,-100,0], [275,20,0]]}
                
            /> */}
        </>
    );
}