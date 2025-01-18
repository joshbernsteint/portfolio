import { ReactNode, useMemo } from "react";
import { useVisible } from "../utils/Hooks";
import SvgHTML from "../components/SvgHTML.tsx";
import { Typography, useTheme } from "@mui/material";
import { useSpring, animated, useSprings, config } from "@react-spring/three";
import { generateCirclePoints, Point2D } from "../utils/Math.ts";
import { AnimatedChip } from "../components/Chip.tsx";



const rectWidth = 1;
const rectHeight = 10;
// const endLength = 46.75;

const AnimatedLine = animated((props: React.SVGLineElementAttributes<SVGLineElement>) => <line stroke="white" strokeLinecap="round" {...props} />);
const ADiv = animated(({children, props, opacity=1} : {children?: ReactNode, props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, opacity?: number}) => <div {...props} style={{...props?.style, opacity: opacity}}>{children}</div>);
const targetStrokeWidth = .75;


type SpokeArgs = {
    rectParams: {
        center: Point2D,
        rotation: number,
        width: number,
        height: number,
    },
    absCenter?: Point2D
    animate?: boolean,
    color?: string,
    contentRadius?: number,
    children?: ReactNode,
    delay?: number,
    edges : [p1: Point2D, p2: Point2D]
};

function Spoke({rectParams, children=[], contentRadius = 40, absCenter=[0,0], edges, animate=false, delay = 0, color="white"} : SpokeArgs){
    const beginRadius : number = 12 + rectHeight;
    const {center, rotation} = rectParams;


    const [contentPoint, startPoint, leftLine, rightLine] = useMemo<[Point2D, Point2D, Point2D, Point2D]>(() => {
        const leftEdge = edges[0];
        const rightEdge = edges[1];
        const content : Point2D = [
            absCenter[0] + (contentRadius * Math.cos(rotation)),
            absCenter[1] + (contentRadius * Math.sin(rotation)),
        ];
        const start : Point2D = [
            absCenter[0] + (beginRadius * Math.cos(rotation)),
            absCenter[1] + (beginRadius * Math.sin(rotation)),
        ];

        const leftMidpoint : Point2D = [
            (leftEdge[0] + start[0])/2,
            (leftEdge[1] + start[1])/2,
        ];

        const rightMidpoint : Point2D = [
            (rightEdge[0] + start[0])/2,
            (rightEdge[1] + start[1])/2,
        ];

        return [content, start, leftMidpoint, rightMidpoint];
    }, [rectParams, contentRadius, absCenter]);

    const mainLineSpring = useSpring({
        x2: animate ? startPoint[0] : center[0],
        y2: animate ? startPoint[1] : center[1],
        strokeWidth: animate ? targetStrokeWidth : 0,
        delay: 500 + delay
    });

    const leftLineSpring = useSpring({
        x2: animate ? leftLine[0] : startPoint[0],
        y2: animate ? leftLine[1] : startPoint[1],
        strokeWidth: animate ? targetStrokeWidth : 0,
        delay: 750 + delay

    });

    const rightLineSpring = useSpring({
        x2: animate ? rightLine[0] : startPoint[0],
        y2: animate ? rightLine[1] : startPoint[1],
        strokeWidth: animate ? targetStrokeWidth : 0,
        delay: 750 + delay
    });


    return (
        <g>
            <g fillOpacity={.85} strokeOpacity={.75}>
                <AnimatedLine 
                    x1={center[0]}
                    y1={center[1]}
                    stroke={color}
                    {...mainLineSpring}
                />
                <AnimatedLine 
                    x1={startPoint[0]} 
                    y1={startPoint[1]} 
                    stroke={color}
                    {...leftLineSpring}
                />
                <AnimatedLine 
                    x1={startPoint[0]} 
                    y1={startPoint[1]}
                    stroke={color}
                    {...rightLineSpring}
                />
            </g>
            {/* <circle r={1} cx={contentPoint[0]} cy={contentPoint[1]}/> */}
            <SvgHTML x={contentPoint[0]} y={contentPoint[1] - 7.5} styles={{transformBox: 'fill-box', transformOrigin: 'center', transform: 'translateX(-50%)'}} height={25} width={30}>
                {children}
            </SvgHTML>
        </g>
    );
}

type PaletteColor = "primary" | "secondary" | "success" | "error" | "info" | "warning";

type SkillSpoke = {
    title: string | ReactNode,
    element: string | ReactNode | ((idx: number, isVisible: boolean) => JSX.Element),
    color?: PaletteColor | string,
};

const spokes : SkillSpoke[] = [
    {
        title: 'Git & Version Control',
        element: (idx, visible) => {
            const spring = useSpring({
                opacity: visible ? 1 : 0,
                delay: idx*500 + 750,
            });

            return (
                <ADiv props={{style: {textAlign: 'center'}}} opacity={spring.opacity}>
                    <br/>
                    Adept at Git-based software. Including managing GitHub/GitLab repositories, creating automations, and running tests.
                </ADiv>
            )
        },
        color: '#c0c0c0',
    },
    {
        title: 'Cloud Computing',
        element: (idx, visible) => {
            const spring = useSpring({
                opacity: visible ? 1 : 0,
                delay: idx*500 + 750,
            });

            return (
                <ADiv opacity={spring.opacity} props={{style: {textAlign: 'center', marginRight: '.1rem'}}}>
                    <br/>
                    Well-versed with different cloud computing platforms. Such as Microsoft Azure, Oracle Cloud, Google Cloud, and Amazon Web Services.
                </ADiv>
            )
        },
        color: 'info',
    },
    {
        title: <span style={{marginRight: '.1rem'}}>Database Management</span>,
        element: (idx, visible) => {
            const spring = useSpring({
                opacity: visible ? 1 : 0,
                delay: idx*500 + 750,
            });

            return (
                <ADiv opacity={spring.opacity} props={{style: {textAlign: 'center', marginRight: '.1rem'}}}>
                        <br/>
                        Experienced with both SQL and NoSQL databases, with particular expertise in PostgreSQL and MongoDB.
                        <br/><br/>
                        Capable with caching technologies such as Redis.
                </ADiv>
            )
        },
        color: 'success',
    },
    {
        title: 'Programming Languages',
        element: (i, visible) => {
            
            const langs : string[] = ["C", "C++", "Python", "Javascript", "Java", "Typescript", "C#", "Assembly", "Erlang", "Ocaml", "Bash"];
            const baseDelay = useMemo(() => i*500, [i]);
            const mainSpring = useSpring({
                opacity: visible ? 1 : 0,
                delay: baseDelay,
            });

            const [chipSprings] = useSprings(langs.length, idx => ({
                pause: !visible,
                from: {
                    opacity: 0,
                },
                opacity: 1,
                delay: baseDelay + (idx * 100),
                config: config.gentle
            }), [visible]);

            return (                
                <ADiv 
                    opacity={mainSpring.opacity}
                    props={{
                        style: {fontSize: 'inherit', marginTop: '1px', display: 'flex', flexDirection: 'column', alignItems: 'center'},
                    }}
                >
                    <p style={{textAlign: 'center'}}>
                        {
                            langs.map((l,idx) => (
                                <span key={idx}>
                                    {(idx > 0 && idx % 4 === 0) && <><br/><br/></>}
                                    <AnimatedChip 
                                        content={l}
                                        opacity={chipSprings[idx].opacity}
                                    />
                                </span>
                            ))
                        }
                    </p>
                </ADiv>
            )
        },
        color: 'primary',
    },
    {
        title: <span style={{marginLeft: '.1rem'}}>Containerization software</span>,
        element: (idx, visible) => {
            const spring = useSpring({
                opacity: visible ? 1 : 0,
                delay: idx*500 + 500,
            });

            return (
                <ADiv props={{style: {marginLeft: '.1rem', textAlign: 'center'}}} opacity={spring.opacity}>
                    <br/>
                    Proficient with containerization and virtualization technologies such as Docker, VirtualBox, and WSL.
                </ADiv>
            )
        },
        color: 'warning'
    },
    {
        title: "Full-stack web development",
        element: (idx, visible) => {
            const spring = useSpring({
                opacity: visible ? 1 : 0,
                delay: idx*500 + 500,
            });

            return (
                <ADiv props={{style: {textAlign: 'center'}}} opacity={spring.opacity}>
                    <br/>
                    Highly accustomed and skilled at working in full-stack environments, principally in the MERN (Mongo, Express, React, Node) stack.
                </ADiv>
            )
        },
        color: 'secondary',
    }
];

export default function Skills({scrollRef}: {scrollRef: any, [prop: string]: any}){

    const theme = useTheme();

    const [circleLines, circleRotations, outerCircle] = useMemo(() => {
        return [
            ...generateCirclePoints(14, 6, undefined, [50,50]),
            generateCirclePoints(40,6, Math.PI/3, [50,50])[0]
        ]
    }, []);
    const [inView, visRef] = useVisible(true);

    const [titleSprings] = useSprings(6, i => ({
        opacity: inView ? 1 : 0,
        delay: (i === 0) ? 350 : (i * 500) + 150
    }), [inView]);

    const mainSpring = useSpring({
        x: inView ? 0 : 30,
        opacity: inView ? 1 : 0,
        delay: 0,
    });
    

    return (
        <div id="skills" className="sectionBlock" ref={scrollRef} style={{marginTop: '2rem', height: '100%'}}>
            <div style={{maxHeight: '100vh'}}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height={'100vh'} width={'100%'}>
                {/* <circle cx={50} cy={50} r={11} fill="transparent" stroke="white" strokeWidth={.5}/> */}
                <SvgHTML x={50} y={50} center height={50} width={50}>
                    <div style={{lineHeight: '100%', height: '50%'}} ref={visRef}>
                        <ADiv opacity={mainSpring.opacity}>
                            <Typography sx={{textAlign: 'center', fontSize: '6pt', verticalAlign: 'baseline', lineHeight: '50px'}} variant="h1">
                                Skills
                            </Typography>
                        </ADiv>
                    </div>
                </SvgHTML>
                {
                    circleLines.map((e,i) => (
                        <Spoke key={i} 
                            rectParams={{
                                center: [e[0], e[1]],
                                rotation: circleRotations[i],
                                height: rectHeight,
                                width: rectWidth,
                            }}
                            delay={i * 250}
                            animate={inView}
                            absCenter={[50,50]}
                            edges={[outerCircle[i], outerCircle[(i+1) % 6]]}
                            color={spokes[i].color && theme.palette[spokes[i].color as PaletteColor] ? theme.palette[spokes[i].color as PaletteColor].main : spokes[i].color}
                        >
                            <div style={{height: '100%', width: '100%'}}>
                                <ADiv opacity={titleSprings[i].opacity}>
                                    <Typography sx={{textAlign: 'center', fontSize: '2pt', verticalAlign: 'baseline'}} variant="h3">
                                        {spokes[i].title}
                                    </Typography>
                                </ADiv>
                                <div style={{fontSize: '1pt'}} hidden={!inView}>
                                    {
                                        typeof spokes[i].element === "function" ? (
                                            spokes[i].element(i, inView)
                                        ) : spokes[i].element
                                    }
                                </div>
                            </div>
                        </Spoke>
                    ))
                }
            </svg>
            </div>
        </div>
    );
}