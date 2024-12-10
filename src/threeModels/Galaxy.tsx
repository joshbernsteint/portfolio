import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useSprings, a, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { randFloat, randInt } from 'three/src/math/MathUtils.js';
import {GradientTexture, GradientType, PerspectiveCamera} from '@react-three/drei'
import StarPoints from '../assets/StarPoints';
import { normalizePoint, point, unNormalizePoint } from '../utils/Math';
import { DodecagonPoints, HexagonPoints, OctagonPoints } from './shapes/defaultPoints';
import { BaseShape, Hexagon, Octagon, Ring, ShapeTypes, Square, Triangle } from './shapes/Shapes';
import TextAndShapes from './shapes/TextAndShapes';

const STAR_COLORS : readonly string[] = [
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
    "#ffbb7b"
]; //Length of 21

const TWO_PI : number = 2*Math.PI;

function Content({periodTime=20, scrollRefs, rotate=true,...props} : any){

    const {viewport} = useThree();
    const {aspect} = viewport;
    const [newPoints, setNewPoints] = useState<point[]>([]);
    const starsRef = useRef();
    const galaxyRadius = 300;

    const stars = useMemo(() => 
        StarPoints.map(pt => {
            const [x,y, radius, colorIndex, brightness] = pt;
            const newPos = [...unNormalizePoint([x,y], galaxyRadius, galaxyRadius), 0];
            
            return {
                position: newPos,
                radius: radius,
                modifier: colorIndex,
                from: {
                    position: newPos,
                    emissiveIntensity: brightness,
                    color: STAR_COLORS[colorIndex],
                    radius: radius,
                },
                to: {
                    emissiveIntensity: brightness + randFloat(0.1,1.5)
                },
    
            }
        }), [galaxyRadius]);


    const [springs, api] = useSprings(stars.length, i => ({
        from: stars[i].from,
        to: stars[i].to,
        delay: i*40,
        config: {duration: randInt(1000, 5000)},
        onRest: (_e, con) => con.start({reverse: true}),
    }), []);

    const [galaxyDiskSpring] = useSpring(() => ({
        args: [galaxyRadius, 120],
    }));

    const [rotateProp, rotateApi] = useSpring(() => ({
        from: {rotation: [0,0,0]},
        to: {rotation: [0,0,rotate ?  TWO_PI : 0]},
        config: {duration: periodTime * 1000},
        loop: true
    }), [rotate]);

    const [counterRotate, counterRotateAPI] = useSpring(() => ({
        from: {rotation: [0,0,0]},
        to: {rotation: [0,0,rotate ?  -TWO_PI : 0]},
        config: {duration: periodTime * 1000},
        loop: true
    }), [rotate]);

    console.log(newPoints);

    useFrame(({clock}) => {
        const time = clock.getElapsedTime();  
        if(starsRef.current){
            const children = (starsRef.current as any).children;
            for (let i = 0; i < children.length; i++) {
                const {position, radius, modifier} = stars[i];
                children[i].position.x = position[0] + (Math.sin(time + modifier)*radius);
                children[i].position.y = position[1] + (Math.cos(time + modifier)*radius);
            }
        }

    })

    function addPoint({point} : any){
        return;
        let newP = [
            ...normalizePoint([point.x, point.y], galaxyRadius, galaxyRadius),
            randFloat(.01, 1) ,randInt(0, STAR_COLORS.length - 1), 
            randFloat(0.25, 1.25)
        ];
        
        // setNewPoints(arr => [...arr, newP]);
    }

    const titleDuration = 2000;

    return (
        <a.group>
            <a.group {...(rotateProp as any)}>
                <group ref={starsRef as any}>
                {
                    StarPoints.map(([_x,_y,radius,_c, _b],i) => (
                        <a.mesh key={i} {...(springs[i] as any)}>
                            <sphereGeometry args={[radius]} attach={'geometry'}/>
                            <a.meshStandardMaterial attach={'material'} emissive={springs[i].color} {...springs[i]}/>
                        </a.mesh>
                    ))
                }
                </group>
                <a.mesh position={[0,0,0]}>
                        <a.circleGeometry {...(galaxyDiskSpring as any)}/>
                        <meshStandardMaterial transparent opacity={0.25}>
                            <GradientTexture 
                                stops={[0,0.2, 1]}
                                colors={['orange', 'yellow','#15181a']}
                                size={2048}
                                width={2048}
                                type={GradientType.Radial}
                                outerCircleRadius={'auto'}

                            />
                        </meshStandardMaterial>
                </a.mesh>
                {/* Center Piece */}
                <TextAndShapes 
                    position={[0,0,0]}
                    groupTextArgs={{rotation: counterRotate.rotation}}
                    onClick={() => {
                        scrollRefs.about?.current.scrollIntoView();
                    }}
                    text={[
                        {
                            content: "Joshua Bernstein",
                            position: [0,0,0],
                            centered: true,
                            textArgs: {size: 14, depth: .1},
                        },
                        {
                            content: "Programmer | Dog Dad | Huge Nerd",
                            position: [0,-15,0],
                            centered: true,
                            textArgs: {size: 5, depth: .1},
                        },
                    ]}
                    shapes={[
                        {
                            type: ShapeTypes.TRIANGLE,
                            args: {
                                factor: 210,
                                position: [0,0,-1],
                                transitionDelay: 0,
                                transitionDelayModifier: 0,
                                lineDuration: titleDuration,
                                fillConfig: {color: 'white', opacity: 0.5, duration: 3000}
                            }
                        },
                        {
                            type: ShapeTypes.HEXAGON,
                            args: {
                                factor: 95,
                                transitionDelay: 0,
                                transitionDelayModifier: 0,
                                lineDuration: titleDuration,
                                fillConfig: {color: 'white', opacity: 0.5, duration: 3000}
                            }
                        }
                    ]}
                />

            </a.group>
            {
                aspect > 0.8 && (
        <group>
            {/* Skills */}
            <TextAndShapes
                position={[200,0,0]}
                text={[
                    {content: "Skills", textArgs: {depth: .2, size: 10}, centered: true, duration: 1500, delay: 0},
                ]}
                shapes={[
                    {
                        type: ShapeTypes.TRIANGLE, 
                        args: {
                            factor: 85, 
                            rotation: [0,0,Math.PI/3], 
                            delay: titleDuration + 500
                        }
                    },
                    {
                        type: ShapeTypes.RING,
                        args: {
                            position: [0,0,-.1],
                            radius: 40,
                            lineThickness: 1,
                            delay: titleDuration + 500,
                        }
                    }
                ]}
            />

            {/* Education */}
            <TextAndShapes
                position={[-120, -130,0]}
                text={[
                    {content: "Education", textArgs: {depth: .2, size: 10}, centered: true, duration: 1500, delay: 0},
                ]}
                shapes={[
                    {
                        type: ShapeTypes.SQUARE, 
                        args: {
                            factor: 38, 
                            rotation: [0,0,0], 
                            delay: titleDuration + 1000,
                        }
                    },
                    {
                        type: ShapeTypes.BASE,
                        args: {
                            points: DodecagonPoints,
                            factor: 45,
                            delay: titleDuration + 1000,
                        }
                    }
                ]}
            />


            {/* Experience */}
            <TextAndShapes 
                position={[120, -130,0]}
                text={[
                    {
                        content: "Experience", 
                        textArgs: {depth: .2, size: 10}, 
                        centered: true,
                        duration: 1500,
                    }
                ]}
                shapes={[
                    {
                        type: ShapeTypes.OCTAGON,
                        args: {
                            factor: 40,
                            rotation: [0,0,Math.PI/8],
                            delay: titleDuration + 1000,
                        }
                    },
                    {
                        type: ShapeTypes.OCTAGON,
                        args: {
                            factor: 44,
                            delay: titleDuration + 1000,
                        }
                    }
                ]}
            />

            {/* Projects */}
            <TextAndShapes 
                position={[-200,0,0]}
                text={[
                    {
                        content: "Projects", 
                        textArgs: {depth: .2, size: 10}, 
                        centered: true,
                        duration: 1500,
                    }
                ]}
                shapes={[
                    {
                        type: ShapeTypes.SQUARE,
                        args: {
                            factor: 40,
                            rotation: [0,0,Math.PI/4],
                            delay: titleDuration + 500,
                        }
                    },
                    {
                        type: ShapeTypes.HEXAGON,
                        args: {
                            factor: 48,
                            delay: titleDuration + 500,
                            onClick: () => console.log('educatioN!'),
                        }
                    }
                ]}
            />
            </group>
            )
            }

        </a.group>
        
    );
}




export default function Galaxy({scrollRefs, current, ...props} : any){

    return (
        <div style={{height: '100%', width: '100%'}}>
        <Canvas linear flat shadows dpr={[1,2]} style={{height: '100%'}}>
            <PerspectiveCamera makeDefault position={[0,-100,200]} fov={90}/>
            <ambientLight intensity={.85} />
            <Content scrollRefs={scrollRefs} rotate={true} periodTime={120}/>
        </Canvas>
        
    </div>
    );
}