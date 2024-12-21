import { useEffect, useMemo, useRef, useState } from "react";
import { useRotate } from "../../utils/SpringHooks";
import LinePath from "../shapes/LinePath";
import { Hexagon, Octagon, Ring, ShapeTypes, Square } from "../shapes/Shapes";
import {a, animated, config, useSpring} from '@react-spring/three';
import { Image, Line, Svg } from "@react-three/drei";
import stevensPNG from '../../assets/images/education/stevens.png';
import mahwahPNG from '../../assets/images/education/mahwah.png';
import { useHover } from "../../utils/Hooks";
import TextAndShapes from "../shapes/TextAndShapes";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import SVGThree from "../shapes/SVG";
import { AnimatedRing } from "../basic/AnimatedLine";
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


type formattedDate = [month: string, year: string] | [];

const greenColor = '#0BDA51';
const TWO_PI = 2*Math.PI;


const DateCircle = (props: {position: [number, number, number], date: formattedDate, inProgress: boolean}) => (
    <TextAndShapes 
        position={props.position}
        shapes={[{type: ShapeTypes.RING, args: {
                radius: 20,
                lineWidth: 1,
                lineColor: props.inProgress ? 'white' : greenColor
            }},
            {type: ShapeTypes.OCTAGON, args: {
                factor: 20,
                rotation: [0,0,-Math.PI/8],
                lineColor: props.inProgress ? 'white' : greenColor
            }},
        ]}
        startPaused={false}
        text={[
            {centered: true, content: props.date[0], position: [0,4,0], textArgs: {depth: .1, size: 4}},
            {centered: true, content: props.date[1], position: [0,-5,0],  textArgs: {depth: .1, size: 4}},
        ]}
    />
);


type CourseBubbleProps = {
    course: course,
    position: [number, number, number] | THREE.Vector3 | [x: number, y: number, z: number],
    radius?: number,
};

function CourseBubble(props: CourseBubbleProps){
    const {course, position, radius=25,} = props;
    const {name, icon, iconRotation=[0,0,0]} = course;
    const [isHovering, setHovering] = useState(false);
    const hover = useHover('pointer', () => {
        setHovering(true);
    }, () => {
        setHovering(false);
    });
    const hoverSpring = useSpring({
        radius: isHovering ? radius : 10,
        lineWidth: isHovering ? radius : .5,
        c: isHovering ? 'gray' : 'white',
        targetOpacity: isHovering ? .95 : 1,
    })

    return (
        <group position={position} {...hover}>
            <AnimatedRing 
                {...hoverSpring}
                thetaEnd={TWO_PI}
            />
            <mesh visible={false}>
                <circleGeometry args={[10]} />
            </mesh>
            {!isHovering && <SVGThree src={icon} color="white" scale={0.01} position={[0,0,0]} rotation={iconRotation}/>}
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
    startDate: [month: string, year: string],
    endDate: [month: string, year: string],
    gpa: string,
    inProgress?: boolean
    numArrows?: number,
    multiplier?: number,
    progressSpeed?: number,
    relevantCourses?: course[],
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
        numArrows=5,
        progressSpeed=0.001,
        multiplier=15,
        relevantCourses=[],
        level,
        schoolUrl="https://www.stevens.edu/",
        schoolIcon={
            src: stevensPNG,
            scale: [98, 105]
        },
    } = props;

    const {rotate} = useRotate(60, {clockwise: spinClockwise, startPaused: true, startRotation: [0,0,0]});
    const [rotateProps, rotateAPI] = rotate;
    const centerHover = useHover('pointer');


    const [lineCurve, linePoints, arrowPoints, coursePoints] = useMemo(() => {
        const curve = new THREE.EllipseCurve(
            0,0,
            105,105,
            1.064*Math.PI, 1.935*Math.PI,
            false, 0
        )

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
    if(inProgress){
        useFrame(animate);
    }
    useEffect(() => {
        if(ref.current && !inProgress){
            animate();
            ref.current.children[0].visible = false;
        }
    }, [ref.current]);



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

                {/* Start - End part */}
                <group>
                    <DateCircle position={[-105, 0, 0]} date={startDate} inProgress={inProgress}/>
                    <DateCircle position={[105, 0, 0]} date={endDate} inProgress={inProgress}/>
                    <Line 
                        position={[0,0,-.1]}
                        points={linePoints}
                        color={'white'}
                        lineWidth={2}
                        visible={false}
                    />
                    <Ring 
                        radius={105}
                        lineWidth={1}
                        thetaStart={1.064*Math.PI}
                        thetaEnd={0.874*Math.PI}
                        lineColor={inProgress ? 'white' : greenColor}
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
            </group>
            <group  rotation={startRotation}>
                <a.group {...rotateProps}>
                    <Hexagon factor={75} fillConfig={{color: 'black'}}/>
                    <Hexagon rotation={[0,0,-Math.PI/2]} factor={75} onRest={() => {
                        rotateAPI.start({pause: false});
                    }}
                />
                </a.group>
                <group rotation={[0,0,-startRotation[2]]} {...centerHover} onClick={() => OpenInNewTab(schoolUrl)}>
                    <AnimatedImage 
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
                schoolIcon={{
                    src: mahwahPNG,
                    scale: 90
                }}
                schoolUrl="https://hs.mahwah.k12.nj.us/"
                relevantCourses={[
                    {name: "AP Computer Science A", icon: compSciSVG, iconRotation: [0,0,Math.PI]},
                    {name: "AP Computer Science Principles", icon: PrinciplesSVG},
                    {name: "Data Structures", icon: structSVG},
                ]}
            />
            <EducationBulb 
                position={[30,-50,0]}
                startDate={["September", "2021"]}
                endDate={["May", "2024"]}
                gpa="3.96"
                level="Bachelor's"
                startRotation={[0,0,-Math.PI/4]} 
                schoolUrl="https://www.stevens.edu/"
                spinClockwise
                relevantCourses={[
                    {
                        name: "Algorithms",
                        icon: StructureSVG
                    },
                    {
                        name: "Computer Organization & Systems",
                        icon: SystemsSVG
                    },
                    {
                        name: "Systems Programming",
                        icon: SystemsProgSVG
                    },
                    {
                        name: "Web Development 1 & 2",
                        icon: webSVG
                    },
                    {
                        name: "Database Systems     1 & 2",
                        icon: databaseSVG, iconRotation: [0,0,Math.PI]
                    },
                    {
                        name: "Concurrent Programming",
                        icon: concurrentSVG, iconRotation: [0,0,Math.PI]
                    },
                    {
                        name: "Operating Systems",
                        icon: OSSVG
                    },
                    {
                        name: "Human Computer Interaction",
                        icon: HCISVG, iconRotation: [0,0,Math.PI]
                    }
                ]}
                />
            <EducationBulb 
                position={[270,20,0]}
                startDate={["September", "2024"]}
                endDate={["May", "2025"]}
                gpa="4.0"
                startRotation={[0,0,Math.PI/3]}
                level="Master's"
                schoolUrl="https://www.stevens.edu/"
                inProgress
                relevantCourses={[
                    {name: "Quantum Computation", icon: QuantumSVG, iconRotation: [0,0,Math.PI]},
                    {name: "Agile Methodology", icon: AgileSVG, iconRotation: [0,0,Math.PI]},
                    {name: "Data Mining", icon: MiningSVG, iconRotation: [0,0,Math.PI]},
                    {name: "Cloud Computing", icon: CloudSVG, iconRotation: [0,0,Math.PI]},
                    {name: "Computer Vision", icon: VisionSVG, iconRotation: [0,0,Math.PI]},
                ]}
                />
            {/* <LinePath 
                points={[[-250,-10,0], [50,-100,0], [275,20,0]]}
                
            /> */}
        </>
    );
}