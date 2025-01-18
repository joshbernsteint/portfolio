import { ReactNode, useRef, useState } from "react";
import { animated, useSpring, useSprings, useTrail } from "@react-spring/web";
import { useHover, useVisible } from "../utils/Hooks";
import { Button, Grid2 as Grid, IconButton, SvgIcon, Tooltip, Typography, useTheme } from "@mui/material";

import EventIcon from '@mui/icons-material/EventAvailable';
import GradeIcon from '@mui/icons-material/Grade';
import SchoolIcon from '@mui/icons-material/School';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PreviewIcon from '@mui/icons-material/Preview';
import DataObjectIcon from '@mui/icons-material/DataObject';
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/Terminal';
import WebIcon from '@mui/icons-material/Web';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';



type EducationRowProps = {
    level: string,
    where: {name: string, link: string, color: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning"},
    date: string,
    gpa: string,
    timeCalcs?: {startDate: string, endDate: string},
    id: string,
    courses: {name: string, icon: ReactNode, link?: string}[]
};

function IconWithText({icon, text, fontSize="16pt", iconSize="30pt"} : {icon: ReactNode, text: string | ReactNode, fontSize?: string, iconSize?: string}){
    return (
        <div style={{ fontSize: fontSize, display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: iconSize, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </span>
            {text}
        </div>
    )
}

const SVGBox = animated(({hoverProps, size=200, ...props} : {hoverProps?: any, size: number, [k: string] : any}) => (
    <div style={{width: '100%', height: '100%'}} {...props}>
            <svg
            viewBox={`0 0 20 20`}
            style={{transform: 'rotate(45deg)'}}
        >
            <rect
                x="50%" 
                y="50%"
                width={size}
                height={size}
                fill="lightgrey"
                stroke="white"
                strokeWidth={.1}
                fillOpacity={.25}
                transform={`translate(-${size / 2}, -${size / 2})`}
                {...hoverProps}
            />
        </svg>
    </div>
));

function RCourse({icon, name, link}: {icon: ReactNode, name: string | ReactNode, link?: string}){
    const [isHovering, setHovering] = useState<boolean>(false);
    const hover = useHover('pointer', () => setHovering(true), () => setHovering(false));

    const expandSpring = useSpring({
        config: {duration: 125},
        size: isHovering ? 15 : 10,
    });

    return (
        <div>
            <div style={{
                position: 'absolute', 
                textAlign: 'center',
                width: '100%', 
                height: '100%', 
                fontSize: '20pt',  
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 15,
                top: '-3px'
                }}>
            <Tooltip arrow title={
                <span style={{fontSize: '12pt'}}>
                    {name}
                </span>
            }>
                <IconButton disableTouchRipple disableRipple {...hover} sx={{fontSize: '20pt'}} href={link || ""} target="_blank">
                    {icon}
                </IconButton>
            </Tooltip>
            </div>
            <SVGBox {...expandSpring}/>
        </div>
    )
}

const AnimatedCalendarIcon = animated(({svgFill, fillColor, id} : {svgFill: number, fillColor: string, id: string}) => (
    <SvgIcon fontSize="inherit">
        <svg viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
        <defs>
            <linearGradient id={id} direction="vertical" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="white" />
                <stop offset={`${100 - svgFill}%`} stopColor="white" />
                <stop offset={`${100 - svgFill}%`} stopColor={fillColor} />
                <stop offset="100%" stopColor={fillColor} />
            </linearGradient>            
        </defs>
        <g fill={`url(#${id})`} stroke="none" strokeWidth="1">
        <path d="M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4,3.01,4.9,3.01,6L3,20c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,20 H5V10h14V20z M9,14H7v-2h2V14z M13,14h-2v-2h2V14z M17,14h-2v-2h2V14z M9,18H7v-2h2V18z M13,18h-2v-2h2V18z M17,18h-2v-2h2V18z"/>
        </g>
    </svg>
    </SvgIcon>
))

function EducationRow({level, where, date, gpa, courses, timeCalcs, delay=0, inView=false, id} : EducationRowProps & {delay: number, inView: boolean}){
    const theme = useTheme();    
    const fillAmount = useRef<number>(100);
    const [loadingIcon, setLoadingIcon] = useState(true);

    function getSVGFill() : number{
        if(!timeCalcs){
            return 100;
        }

        const startStamp = Date.parse(timeCalcs?.startDate || "");
        const endStamp = Date.parse(timeCalcs?.endDate || "");
        const now = Date.now();
        if(now > endStamp){
            return 100;
        }
        const wayThrough = (now - startStamp) / (endStamp - startStamp);
        fillAmount.current = wayThrough * 100
        return fillAmount.current;
    }

    
    const fillSpring = useSpring({
        config: {duration: 1000},
        from: {svgFill: 0},
        svgFill: getSVGFill(),
        pause: !inView,
        delay: delay,
        onRest: () => {            
            if(fillAmount.current === 100){
                setLoadingIcon(false);
            }
        }
    });

    const hrSpring = useSpring({
        width: inView ? '30%' : '0%',
        config: {duration: courses.length * 100},
        delay: delay + 100,
    })

    const courseTrails = useTrail(courses.length, {
        opacity: inView ? 1 : 0,
        config: {clamp: true},
        delay: delay,
    })



    return (
        <div style={{marginBottom: '20px'}}>
            <Typography variant="h3" sx={{display: 'inline', verticalAlign: 'middle'}}>{level}</Typography>{' '}
            <span style={{fontSize: '20pt', verticalAlign: 'middle', fontStyle: 'italic'}}>
                &mdash; <Button href={where.link} color={where.color} target="_blank" sx={{fontSize: 'inherit'}}>{where.name}</Button>
            </span><br/>

            <IconWithText icon={loadingIcon ? (
                <AnimatedCalendarIcon fillColor={theme.palette.success.main} {...fillSpring} id={id}/>
            ) : <EventIcon fontSize="inherit" color="success" />
            } 
            text={
                <span style={{ fontStyle: 'italic', verticalAlign: 'middle', marginLeft: '1rem'}}>{date}</span>
            }/>
            <IconWithText 
                icon={<GradeIcon fontSize="inherit" color="inherit"/>}
                fontSize="14pt"
                text={
                    <Tooltip 
                        title={<span style={{fontSize: '12pt'}}>GPA is on a 4-point scale.</span>}
                        describeChild
                        arrow
                    >
                        <Button sx={{fontSize: 'inherit', marginLeft: '.5rem'}} color="inherit" disableRipple>{gpa} GPA</Button>
                    </Tooltip>
                }
            />
            <IconWithText 
                icon={<SchoolIcon fontSize="inherit"/>}
                text={<span style={{marginLeft: '1rem'}}>Relevant Coursework</span>}
            />
            <animated.hr style={{width: hrSpring.width, marginLeft: 0}}/>
            <div style={{width: 'auto', padding: '0rem'}}>
                <Grid container sx={{textAlign: 'center'}} gap={0}>
                    {
                        courses.map((e,i) => (
                            <Grid size={1.25} sx={{position: 'relative', fontSize: '16pt', margin: 0}} key={i}>
                                <animated.div style={{opacity: courseTrails[i].opacity}}>
                                    <RCourse {...e}/>
                                </animated.div>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    );
}

const myEducation : EducationRowProps[] = [
    {
        timeCalcs: {startDate: '9/1/2024', endDate: '5/22/2025'},
        level: "Masters' Degree",
        id: 'master',
        where: {
            name: "Stevens Institute of Technology",
            link: "https://www.stevens.edu/",
            color: 'error'
        },
        date: "September 2024 to May 2025",
        gpa: "4.0",
        courses: [
            {name: "Quantum Computation",link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/500/cs-517/", icon: <KeyboardIcon fontSize="inherit"/>},
            {name: "Agile Methods for Development",link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/500/cs-555/", icon: <SvgIcon fontSize="inherit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" stroke="white" width="24px" fill="white"><path d="m216-160-56-56 384-384H440v80h-80v-160h233q16 0 31 6t26 17l120 119q27 27 66 42t84 16v80q-62 0-112.5-19T718-476l-40-42-88 88 90 90-262 151-40-69 172-99-68-68-266 265Zm-96-280v-80h200v80H120ZM40-560v-80h200v80H40Zm739-80q-33 0-57-23.5T698-720q0-33 24-56.5t57-23.5q33 0 57 23.5t24 56.5q0 33-24 56.5T779-640Zm-659-40v-80h200v80H120Z"/></svg></SvgIcon>},
            {name: "Data Mining",link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/500/cs-513/", icon: <QueryStatsIcon fontSize="inherit"/>},
            {name: "Cloud Computing",link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/500/cs-526/", icon: <SvgIcon fontSize="inherit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M280-320h260q42 0 71-29.5t29-71.5q0-42-30-71t-72-29q-8-51-47-85t-91-34q-41 0-75 22t-51 59q-48 2-81 36.5T160-440q0 50 35 85t85 35Zm0-80q-17 0-28.5-11.5T240-440q0-17 11.5-28.5T280-480h50v-10q0-29 20.5-49.5T400-560q29 0 49.5 20.5T470-490v50h70q8 0 14 6t6 14q0 8-6 14t-14 6H280Zm0 360v-80h60v-80H120q-33 0-56.5-23.5T40-280v-400q0-33 23.5-56.5T120-760h560q33 0 56.5 23.5T760-680v400q0 33-23.5 56.5T680-200H460v80h60v80H280Zm560-360v-440H200v-80h640q33 0 56.5 23.5T920-840v440h-80ZM120-280h560v-400H120v400Zm280-200Z"/></svg></SvgIcon>},
            {name: "Computer Vision",link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/500/cs-558/", icon: <PreviewIcon fontSize="inherit"/>},
        ],
    },
    {
        level: "Bachelors' Degree",
        id: 'bachelors',
        where: {
            name: "Stevens Institute of Technology",
            link: "https://www.stevens.edu/",
            color: 'error'
        },
        date: "September 2021 to May 2024",
        gpa: "3.96",
        courses: [
            {name: "Algorithms", icon: <FormatListNumberedIcon fontSize="inherit"/>, link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/300/cs-385/"},
            {name: "Computer Organization & Systems",link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/300/cs-382/", icon: <SvgIcon fontSize="inherit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h560q33 0 56.5 23.5T800-760v80h80v80h-80v80h80v80h-80v80h80v80h-80v80q0 33-23.5 56.5T720-120H160Zm0-80h560v-560H160v560Zm80-80h200v-160H240v160Zm240-280h160v-120H480v120Zm-240 80h200v-200H240v200Zm240 200h160v-240H480v240ZM160-760v560-560Z"/></svg></SvgIcon>},
            {name: "Systems Programming",icon: <TerminalIcon fontSize="inherit"/>, link: "https://stevens.smartcatalogiq.com/en/2024-2025/academic-catalog/courses/cs-computer-science/300/cs-392/"},
            {name: "Web Programming 1 & 2",link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/500/cs-546/",icon: <WebIcon fontSize="inherit"/>},
            {name: "Database Management Systems 1 & 2",link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/500/cs-561/", icon: <SvgIcon><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z"/></svg></SvgIcon>},
            {name: "Concurrent Programming",link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/500/cs-511/",icon: <SvgIcon fontSize="inherit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M120-240q-33 0-56.5-23.5T40-320q0-33 23.5-56.5T120-400h10.5q4.5 0 9.5 2l182-182q-2-5-2-9.5V-600q0-33 23.5-56.5T400-680q33 0 56.5 23.5T480-600q0 2-2 20l102 102q5-2 9.5-2h21q4.5 0 9.5 2l142-142q-2-5-2-9.5V-640q0-33 23.5-56.5T840-720q33 0 56.5 23.5T920-640q0 33-23.5 56.5T840-560h-10.5q-4.5 0-9.5-2L678-420q2 5 2 9.5v10.5q0 33-23.5 56.5T600-320q-33 0-56.5-23.5T520-400v-10.5q0-4.5 2-9.5L420-522q-5 2-9.5 2H400q-2 0-20-2L198-340q2 5 2 9.5v10.5q0 33-23.5 56.5T120-240Z"/></svg></SvgIcon>},
            {name: "Operating Systems", icon: <DeveloperModeIcon fontSize="inherit" />, link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/400/cs-492/"},
            {name: "Human Computer Interaction",link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/500/cs-545/",icon: <SvgIcon fontSize="inherit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="m280-620 80-80-80-80-80 80 80 80Zm200-40ZM160-400q-33 0-56.5-23.5T80-480v-360q0-33 23.5-56.5T160-920h640q33 0 56.5 23.5T880-840v360q0 33-23.5 56.5T800-400H671q6-20 8-40t0-40h121v-360H160v360h121q-2 20 0 40t8 40H160Zm500-280q25 0 42.5-17.5T720-740q0-25-17.5-42.5T660-800q-25 0-42.5 17.5T600-740q0 25 17.5 42.5T660-680ZM200-40v-84q0-35 19.5-65t51.5-45q49-23 102-34.5T480-280q54 0 107 11.5T689-234q32 15 51.5 45t19.5 65v84H200Zm80-80h400v-4q0-12-7-22t-18-15q-42-19-86-29t-89-10q-45 0-89 10t-86 29q-11 5-18 15t-7 22v4Zm200-200q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm0-80q25 0 42.5-17.5T540-460q0-25-17.5-42.5T480-520q-25 0-42.5 17.5T420-460q0 25 17.5 42.5T480-400Zm0-60Zm0 340Z"/></svg></SvgIcon>}
        ]
    },
    {
        level: "High School",
        id: 'hs',
        where: {
            name: "Mahwah High School",
            link: "https://hs.mahwah.k12.nj.us/",
            color: 'info'
        },
        date: "September 2017 to June 2021",
        gpa: "4.0",
        courses: [
            {name: "AP Computer Science A", icon: <CodeIcon fontSize="inherit"/>},
            {name: "AP Computer Science Principles", icon: <SvgIcon fontSize="inherit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M80-160v-120h80v-440q0-33 23.5-56.5T240-800h600v80H240v440h240v120H80Zm520 0q-17 0-28.5-11.5T560-200v-400q0-17 11.5-28.5T600-640h240q17 0 28.5 11.5T880-600v400q0 17-11.5 28.5T840-160H600Zm40-120h160v-280H640v280Zm0 0h160-160Z"/></svg></SvgIcon>},
            {name: "Data Structures", icon: <DataObjectIcon fontSize="inherit"/>},
        ]
    }
];

const EducationBlurb : (string | ReactNode)[] = [
    "Over the last 8 years, I've been very fortunate in that I've been able to attend classes to richen and broaden my horizons in the field of computer science.",
    <>
        Starting my freshman year of High School, I was able to take the introduction to Programming course and simply fell in love. I then went on to take AP Computer Science
        my Sophomore year, and then then AP Computer Science Principles and Data Structures my Junior year. 
    </>,
    <>
        Due to my high amount of AP credits and dual-enrollments, I was able to graduate college with my Bachelors' one year early. However, I wasn't done with school there. Because Stevens has a 5 year Masters' program, track, I applied to it with the hope of getting my Bachelors' and Masters' degree in 4 years, which is what I'm currently on track to do!
    </>,
    <>
        My eternal gratitude goes to all my teachers, professors, and advisors who have helped me on my education journey. It simply wouldn't have been possible without their amazing support and guidance.
    </>
]

export default function Education({scrollRef} : any){

    const [inView, visRef] = useVisible();

    const titleSpring = useSpring({
        y: inView ? 0 : 50,
        opacity: inView ? 1 : 0
    });

    const [trail] = useSprings(myEducation.length, i => ({
        config: {duration: 500},
        maxHeight: inView ? '100%' : '0%',
        opacity: inView ? 1 : 0,
        delay: (i+2)*250,
    }), [inView]);

    const blurbTrail = useTrail(EducationBlurb.length, ({
        opacity: inView ? 1 : 0,
        config: {clamp: true},
        delay: 500,
    }))

    return (
        <div id="education" className="sectionBlock" ref={scrollRef} style={{position: 'relative'}}>
            <Grid container>
                <Grid size={5}>
                    <div>
                        <animated.div style={{textAlign: 'center', ...titleSpring}} ref={visRef}>
                            <Typography variant="h1">Education</Typography>
                        </animated.div><br/>
                        <animated.div style={{width: '50%', margin: 'auto'}}>
                            {
                                EducationBlurb.map((e,i) => (
                                    <animated.div key={i} style={{opacity: blurbTrail[i].opacity}}>
                                        <Typography variant="body1">{e}</Typography><br/>
                                    </animated.div>
                                ))
                            }
                        </animated.div>
                    </div>
                </Grid>
                <Grid size={7}>
                    {
                        myEducation.map((e,i) => (
                        <animated.div key={i} style={{opacity: trail[i].opacity}}>
                            <EducationRow {...e} delay={((i+2)*250) + 500} inView={inView}/>
                        </animated.div>
                        ))
                    }
                </Grid>
            </Grid>
        </div>
    );
}