import { useEffect, useMemo, useRef, useState } from "react";
import { useRotate } from "../../utils/SpringHooks";
import LinePath from "../shapes/LinePath";
import { AnimatedShapes, Hexagon, Octagon, Ring, ShapeTypes, Square } from "../shapes/Shapes";
import {a, animated, config, useSpring} from '@react-spring/three';
import { Image, Line, Svg } from "@react-three/drei";
import stevensPNG from '../../assets/images/education/stevens.png';
import mahwahPNG from '../../assets/images/education/mahwah.png';
import { useHover } from "../../utils/Hooks";
import TextAndShapes from "../shapes/TextAndShapes";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import SVGThree from "../shapes/SVG";
import Text from "../basic/Text";

// Icon imports
import compSciSVG from '../../assets/svg/education/comp_sci.svg';
import PrinciplesSVG from '../../assets/svg/education/principles.svg';
import structSVG from '../../assets/svg/education/struct.svg';
import StructureSVG from '../../assets/svg/education/data_structures.svg';
import SystemsSVG from '../../assets/svg/education/systems.svg';
import SystemsProgSVG from '../../assets/svg/education/systems_prog.svg';
import OSSVG from '../../assets/svg/education/os.svg';
import webSVG from '../../assets/svg/education/web.svg';
import databaseSVG from '../../assets/svg/education/database.svg';
import concurrentSVG from '../../assets/svg/education/concurrent.svg';
import HCISVG from '../../assets/svg/education/hci.svg';
import VisionSVG from '../../assets/svg/education/vision.svg';
import AgileSVG from '../../assets/svg/education/agile.svg';
import QuantumSVG from '../../assets/svg/education/quantum.svg';
import MiningSVG from '../../assets/svg/education/mining.svg';
import CloudSVG from '../../assets/svg/education/cloud.svg';
import CodeSVG from '../../assets/svg/education/code.svg';
import { OpenInNewTab } from "../../utils/window";
import { AnimatedBaseShape, BaseShape } from "../shapes/NShapes";
import { HexagonPoints, OctagonPoints, TrianglePoints } from "../shapes/defaultPoints";
import { position } from "../../utils/types";
import { NRing } from "../basic/AnimatedLine";


type formattedDate = [month: string, year: string, day?: string] | [];

const greenColor = '#0BDA51';
const TWO_PI = 2*Math.PI;


const DateCircle = (props: {position: position, date: formattedDate, inProgress: boolean}) => (
    <group position={props.position}>
        <NRing 
            radius={20}
            lineWidth={1}
            c={props.inProgress ? 'white' : greenColor}
            thetaEnd={TWO_PI}
        />
        <BaseShape 
            points={OctagonPoints}
            factor={20}
            lineColor={props.inProgress ? 'white' : greenColor}
            fill
            fillOpacity={.5}
        />
        <Text 
            textArgs={{depth: .1, size: 4.5}} 
            centered 
            charactersPerLine={5} 
            content={props.date[0] + " " + props.date[1]}
        />
    </group>
);


type CourseBubbleProps = {
    course: course,
    position: [number, number, number] | THREE.Vector3 | [x: number, y: number, z: number],
    radius?: number,
    Shape?: JSX.Element,
};

function CourseBubble(props: CourseBubbleProps){
    const {course, position, radius=25, Shape=undefined,} = props;
    const {name, icon, iconRotation=[0,0,0], fullSize=20} = course;
    const [isHovering, setHovering] = useState(false);
    const hover = useHover('pointer', () => {
        setHovering(true);
    }, () => {
        setHovering(false);
    });

    const factorSpring = useSpring({
        factor: isHovering ? fullSize : 8,
        fillOpacity: isHovering ? .75 : .5,
        config: {
            ...config.slow,
            duration: 250,
        }
    })

    return (
        <group position={position} {...hover}>
            <AnimatedBaseShape 
                rotation={[0,0,-Math.PI/4]} 
                {...factorSpring}
                fill
            />
            {!isHovering && <SVGThree src={icon} color="white" scale={0.01} position={[0,0,0.1]} rotation={iconRotation}/>}
            {
                isHovering && (
                    <Text content={name} textArgs={{depth: .1, size: 5}} centered charactersPerLine={12} lineSpacing={1.75}/>
                )
            }
        </group>
    );
}

type course = {
    name: string,
    icon: string,
    iconRotation?: [number, number, number],
    fullSize?: number,
}

type EducationBulbProps = {
    position: [x: number, y: number, z: number],
    spinClockwise?: boolean,
    startRotation?: [number,number,number],
    level: string,
    schoolUrl: string,
    schoolIcon?: {
        src: string,
        scale: [number,number] | number
    },
    startDate: formattedDate,
    endDate: formattedDate,
    gpa: string,
    gpaColor?: string,
    numArrows?: number,
    multiplier?: number,
    progressSpeed?: number,
    relevantCourses?: course[],
};


function EducationBulb(props: EducationBulbProps){
    const {
        position,
        spinClockwise=false,
        startDate=[], 
        endDate=[],
        startRotation=[0,0,0],
        numArrows=5,
        progressSpeed=0.001,
        multiplier=15,
        relevantCourses=[],
        gpa='4.0',
        gpaColor="red",
        level,
        schoolUrl="https://www.stevens.edu/",
        schoolIcon={
            src: stevensPNG,
            scale: [98, 105]
        },
    } = props;

    const {rotate} = useRotate(60, {clockwise: spinClockwise, startPaused: false, startRotation: [0,0,0]});
    const [rotateProps] = rotate;
    const centerHover = useHover('pointer');


    const [lineCurve, linePoints, arrowPoints, coursePoints] = useMemo(() => {
        const curve = new THREE.EllipseCurve(
            0,0,
            105,105,
            1.064*Math.PI, 1.935*Math.PI,
            false, 0
        );

        // Points for arrow
        const arrow: [x: number, y: number][] = [[0,3], [3,0], [0, -3]];

        // Getting location for courses
        const coursePoints: THREE.Vector2[] = relevantCourses.map((_,i) => {
            const t = (i+1)/(relevantCourses.length+1)
            const pt = curve.getPointAt(t);
            const tan = curve.getTangentAt(t);

            const perp = new THREE.Vector2(-tan.y, tan.x);
            perp.normalize();

            const distance = i % 2 == 0 ?  multiplier : -multiplier;
            perp.multiplyScalar(distance);

            return pt.clone().add(perp);
        });



        return [curve, curve.getPoints(50), arrow, coursePoints];
    }, []);


    const [green, white, progressing] = useMemo<[[number, number], [number, number], [boolean, boolean]]>(() => {
        function getTimestamp(date: formattedDate){
            const [month, year, day="1"] = date;
            return Date.parse(`${month} ${day} ${year}`);
        }
        const start = 1.064*Math.PI;
        const end = start + 0.874*Math.PI;
        const allGreen: [[number, number], [number, number], [boolean, boolean]] = [[start, end - start], [0,0], [false, false]];
        const endTime = getTimestamp(endDate);
        const startTime = getTimestamp(startDate);
        const now = Date.now();
    
        if(now > endTime)
            return allGreen;

        const wayThrough = (now - startTime) / (endTime - startTime);
        const greenTheta = (end - start) * wayThrough;
        const secondStart = start + greenTheta;
        
        return [
            [start, greenTheta],
            [secondStart, end - secondStart],
            [false, true],
        ];
    }, [startDate, endDate]);

    const ref = useRef<any>();
    const tList = useRef<number[]>(new Array(numArrows).fill(0).map((_,i) => i/numArrows));
    function animate(){
        if(ref.current && tList.current){
            const current = tList.current;
            for (let i = 0; i < current.length; i++) {
                const child = ref.current.children[i];
                let t = current[i];
                t += progressSpeed;
                if(t > 0.99) t = 0;
                const point = lineCurve.getPointAt(t);
                const tangent = lineCurve.getTangentAt(t);
                child.position.set(...point, .01);
                child.rotation.z = Math.atan2(tangent.y, tangent.x);
                tList.current[i] = t;
            }
        }
    }
    if(progressing[1]){
        useFrame(animate);
    }
    useEffect(() => {
        if(ref.current && !progressing[1]){
            animate();
            ref.current.children[0].visible = false;
        }
    }, [ref.current]);



    return (
        <group position={position}>
            {/* Title and GPA */}
            <group position={[0,90,0]}>
                <BaseShape 
                    points={[
                        [-.5,-.1],
                        [.5,-.1],
                        [.5, .1],
                        [-.5, .1],
                        [-.5, -.1]
                    ]}
                    fill
                    fillOpacity={.5}
                />
                <Text content={level} centered position={[0,0,.1]} textArgs={{depth: .1, size: 10}} color={gpaColor}/>

                {/* GPA */}
                <group position={[70,0,0]}>
                        <BaseShape 
                            points={HexagonPoints}
                            factor={12}
                            fill
                            fillOpacity={.5}
                            lineColor={'gold'}
                        />
                        <BaseShape 
                            points={HexagonPoints}
                            factor={12}
                            rotation={[0,0,-Math.PI/2]}
                            lineColor={'gold'}
                        />
                        <Text centered content={gpa} textArgs={{depth: .1, size: 5}}/>
                    </group>
            </group>

            {/* Start - End part */}
            <group>
                <DateCircle position={[-105, 0, 0]} date={startDate} inProgress={progressing[0]}/>
                <DateCircle position={[105, 0, 0]} date={endDate} inProgress={progressing[1]}/>
                <Line 
                    position={[0,0,-.1]}
                    points={linePoints}
                    color={'white'}
                    lineWidth={2}
                    visible={false}
                />
                <NRing 
                    position={[0,0,-.1]}
                    radius={105}
                    lineWidth={1}
                    thetaStart={green[0]}
                    thetaEnd={green[1]}
                    c={greenColor}
                />
                <NRing
                        position={[0,0,-.1]}
                        radius={105}
                        lineWidth={1}
                        thetaStart={white[0]}
                        thetaEnd={white[1]}
                        c={'white'}
                />
                <group ref={ref}>
                {
                    tList.current.map((_,i) => (
                        <Line
                            key={i}
                            position={[100, 0, 0]}
                            points={arrowPoints}
                            linewidth={3}
                            color={greenColor}
                        />
                    ))
                }
                </group>
                <group>
                    {
                        coursePoints.map((p,i) => (
                            <CourseBubble position={[p.x, p.y, .1]} key={i} course={relevantCourses[i]}/>
                        ))
                    }
                </group>
            </group>

            {/* Center Bulb */}
            <group  rotation={startRotation}>
                <a.group {...rotateProps}>
                    <BaseShape points={HexagonPoints} factor={75} fillColor="black" fill fillOpacity={0.5}/>
                    <BaseShape points={HexagonPoints} factor={75} rotation={[0,0,-Math.PI/2]} fill fillOpacity={0.5}/>
                </a.group>
                <group rotation={[0,0,-startRotation[2]]} {...centerHover} onClick={() => OpenInNewTab(schoolUrl)}>
                    <Image 
                        url={schoolIcon.src}
                        scale={schoolIcon.scale}
                        radius={0}
                        position={[0,0,.1]}
                        transparent
                    />
                </group>
            </group>
        </group>
    );
}

export default function EducationThree(props: any){

    return (
        <>
            <EducationBulb
                position={[-270, 20,0]}
                level="High School"
                startDate={["September", "2017"]}
                endDate={["June", "2021"]}
                gpa="4.0"
                gpaColor="lightblue"
                schoolIcon={{
                    src: mahwahPNG,
                    scale: 90
                }}
                schoolUrl="https://hs.mahwah.k12.nj.us/"
                relevantCourses={[
                    {name: "AP Computer Science A", icon: compSciSVG, iconRotation: [0,0,Math.PI]},
                    {name: "AP Computer Science Principles", icon: PrinciplesSVG, fullSize: 24},
                    {name: "Data Structures", icon: structSVG, fullSize: 18},
                ]}
            />
            <EducationBulb 
                position={[30,-50,0]}
                startDate={["September", "2021"]}
                endDate={["May", "2024", "22"]}
                gpa="3.96"
                level="Bachelor's"
                startRotation={[0,0,-Math.PI/4]} 
                schoolUrl="https://www.stevens.edu/"
                spinClockwise
                relevantCourses={[
                    {name: "Algorithms", icon: StructureSVG, fullSize: 15},
                    {name: "Computer Organization & Systems",icon: SystemsSVG, fullSize: 21},
                    {name: "Systems Programming",icon: SystemsProgSVG, fullSize: 21},
                    {name: "Web Development 1 & 2",icon: webSVG, fullSize: 18},
                    {name: "Database Systems     1 & 2",icon: databaseSVG, iconRotation: [0,0,Math.PI], fullSize: 19},
                    {name: "Concurrent Programming",icon: concurrentSVG, iconRotation: [0,0,Math.PI], fullSize: 21},
                    {name: "Operating Systems", icon: OSSVG, fullSize: 18,},
                    {name: "Human Computer Interaction",icon: HCISVG, iconRotation: [0,0,Math.PI], fullSize: 21}
                ]}
                />
            <EducationBulb 
                position={[270,20,0]}
                startDate={["September", "2024", "1"]}
                endDate={["May", "2025", "22"]}
                gpa="4.0"
                startRotation={[0,0,Math.PI/3]}
                level="Master's"
                schoolUrl="https://www.stevens.edu/"
                relevantCourses={[
                    {name: "Quantum Computation", icon: QuantumSVG, iconRotation: [0,0,Math.PI]},
                    {name: "Agile Methodology", icon: AgileSVG, iconRotation: [0,0,Math.PI]},
                    {name: "Data      Mining", icon: MiningSVG, iconRotation: [0,0,Math.PI], fullSize: 15},
                    {name: "Cloud Computing", icon: CloudSVG, iconRotation: [0,0,Math.PI], fullSize: 18},
                    {name: "Computer Vision", icon: VisionSVG, iconRotation: [0,0,Math.PI], fullSize: 18},
                ]}
                />
        </>
    );
}