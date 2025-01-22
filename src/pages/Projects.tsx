import { Button, Grid2 as Grid, SvgIcon, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";


// Image Imports
import algoRacerImage from '../assets/images/projects/algoracer.png';
import coverAIImage from '../assets/images/projects/coverai.png';
import rhythmImage from '../assets/images/projects/rhythm.png';
import angelImage from '../assets/images/projects/angel.png';
import solarImage from '../assets/images/projects/team11.png';
import websiteOneImage from '../assets/images/projects/website_v1.png';
import ethelImage from '../assets/images/projects/ethel_cpu.png';
import assemblyImage from '../assets/images/projects/arm.png';
import thisImage from '../assets/images/projects/this.png';
import csGamesImage from '../assets/images/projects/cs_games.png';
import algebropilerImage from '../assets/images/projects/algebropiler.png';

import svgs from '../assets/svg/projects';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import ImageButton, { ImageButtonProps } from "../components/ImageButton.tsx";
import SortIcon from '@mui/icons-material/Sort';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import { getMonthYear } from "../utils/Date.ts";
import LinkButton from "../components/LinkButton.tsx";
import AType from "../components/animated/AnimatedTypography.tsx";
import { useVisible } from "../utils/Hooks.tsx";

import { useSpring, a, useTrail, useSprings } from "@react-spring/web";


const stackMap : {[key: string]: {name: string, link: string}} = {
    openai: {name: "OpenAI", link: "https://openai.com/"},
    react: {name: "React.js", link: "https://react.dev/"},
    express: {name: "Express.js", link: "https://expressjs.com/"},
    mongo: {name: "MongoDB", link: "https://www.mongodb.com/"},
    tailwind: {name: "TailwindCSS", link: "https://tailwindcss.com/"},
    clerk: {name: "Clerk", link: "https://clerk.com/"},
    socket: {name: "Socket.io", link: "https://socket.io/"},
    docker: {name: "Docker", link: "https://www.docker.com/"},
    redis: {name: "Redis", link: "https://redis.io/"},
    ffmpeg: {name: "ffmpeg", link: "https://www.ffmpeg.org/"},
    three: {name: "Three.js", link: "https://threejs.org/"},
    electron: {name: "Electron.js", link: "https://www.electronjs.org/"},
    firebase: {name: "Firebase", link: "https://firebase.google.com/"},
    stripe: {name: "Stripe", link: "https://stripe.com/"},
    logisim: {name: "Logisim Evolution", link: "https://github.com/logisim-evolution/logisim-evolution"},
    python: {name: "Python", link: "https://www.python.org/"},
    javascript: {name: "Javascript", link: "https://en.wikipedia.org/wiki/JavaScript"},
    mui: {name: "Material UI", link: "https://mui.com/"},
    typescript: {name: "Typescript", link: "https://www.typescriptlang.org/"},
    c: {name: "C", link: "https://en.wikipedia.org/wiki/C_(programming_language)"},
    vscode: {name: "VSCode API", link: "https://code.visualstudio.com/api/references/vscode-api"},
    spring: {name: "React Spring", link: "https://www.react-spring.dev/"},
};

function url(src: string) : string {
    return `url(${src})`;
}

enum displayTypes{
    ALL,
    SOLO,
    GROUP,
};

type Project = {
    name: string,
    title: string,
    subtitle: string,
    desc?: string | ReactNode,
    features?: string | ReactNode,
    stack: string[],
    type: displayTypes,
    link: string,
    buttonProps: ImageButtonProps,
    completedDate: number,
    description?: (string | ReactNode)[],
}

const projects : Project[] = [
    // coverai
    {
        name: "coverai",
        title: "CoverAI",
        subtitle: "Automated Cover Letter Generation",
        desc: <>
            Use AI to generate a cover letter perfectly tailored for a job. 
            The letter incorporates details about both the job posting as well as personal details about yourself, such as your skills and prior experience. 
            This data is acquired either via a manual form or through a parsing of your resume.
            <br/><br/>
            To get the data about the job posting, you can do it manually, OR you can use our chrome extension to automatically get all the data for the specified posting. 
            Once a cover letter is generated, you can edit it and save it to your account, where it will be stored indefinitely. 
        </>,
        features: <>
            <ul>
                <li>Choose between different resumes to be used as the source for the cover letter. This allows you to create cover letters for different puproses. Such as a technical cover letter or a business-focused one.</li>
                <li>Edit generated cover letters in a rich text editor to fine tune them as you see fit.</li>
                <li>Your previously-generated letters are fed into the AI to make it more accurate.</li>
                <li>Chrome extension to automatically scrape job data to feed into the cover letter generation.</li>
            </ul>
        </>,
        stack: ['openai','react', 'express', 'mongo', 'tailwind', 'clerk'],
        type: displayTypes.GROUP,
        link: "https://github.com/joshbernsteint/CoverAI",
        completedDate: Date.parse('4/26/2024'),
        buttonProps: {
            children: "CoverAI",
            image: url(coverAIImage)
        }
    },
    // algoracer
    {
        name: "algoracer",
        title: "AlgoRacer",
        subtitle: "Algorithm Learning Game",
        desc: <>
            Learn fundamental computer science algorithms by playing a fun game! Race against a computer to complete the steps of a sorting algorithm. Only by completing the steps of the algorithm correctly can you score points.
            There are two primary gamemodes: Race and Endless. 

            <p>
                In Race, you and the computer race to sort a certain number of arrays before the other. This mode is considerably easier than Endless.
            </p>

            <p>
            In Endless, the game ends when the computer overtakes you, which can either be after 5 arrays or 50. The caveat is that everytime you complete an array, the computer speeds up.
            When you inevitably lose, you can compare with other users on our leaderboard system to see how you did.
            </p>
        </>,
        features: <ul>
            <li>Drag and Drop array elements to simulate the steps of the specified sorting algorithm.</li>
            <li>3 default algorithms: Bubble, insertion, and selection sort.</li>
            <li>Practice mode to hone your skills in a non-competitive environment.</li>
            <li>Detailed descriptions and examples of each sorting algorithm.</li>
        </ul>,
        stack: ['react', 'express', 'mongo'],
        type: displayTypes.GROUP,
        link: "https://github.com/joshbernsteint/AlgoRacer",
        completedDate: Date.parse('12/11/2023'),
        buttonProps: {
            children: "AlgoRacer",
            image: url(algoRacerImage),
            imageProps: {
                backgroundColor: 'rgba(0,0,0,.5)', 
                backgroundBlendMode: 'darken', 
                backgroundPosition: 'center'
            }
        }
    },
    // rhythm
    {
        name: "rhythm_game",
        type: displayTypes.GROUP,
        title: "Rhythm Game",
        subtitle: "Typing Rhythm Game",
        desc: <>
            Rhythm games typically rely upon using a small subset of the available keyboard. 
            However, this project aimed to create a game that utilized every possible key. Both for the aim of variety as well as learning how to type quickly and correctly. 
            Users can play a level with a song playing, and they must type specific keys as specified to the beat.

            <p>
                On top of playing singleplayer, you can also play multiplayer, where multiple different players (on different devices) compete to see who can get the highest score. 
                Moreover, there is a detailed level editor where you can create and edit your own levels, and upload them for others to see.
            </p>
        </>,
        features: <ul>
            <li>Singleplayer or multiplayer modes, where users can join or create lobbies of their favorite levels.</li>
            <li>Detailed level creator to build your own levels from an uploaded song file.</li>
            <li>Friend users to see their levels and lobbies more prominently.</li>
        </ul>,
        stack: ['react', 'express','docker', 'mongo', 'redis', 'clerk', 'socket', 'ffmpeg'],
        link: "https://github.com/ulrokx/cs554-rhythm",
        completedDate: Date.parse('5/8/2024'),
        buttonProps: {
            image: url(rhythmImage),
            children: "Rhythm Game",
            imageProps: {
                backgroundColor: 'rgba(0,0,0,.5)', 
                backgroundBlendMode: 'darken', 
                backgroundPosition: 'center'
            }
        },
    },
    // website v1
    {
        name: "website_v1",
        type: displayTypes.SOLO,
        title: "My Website",
        subtitle: "Well, the first version",
        desc: <>
            It's function was simple: Be a place to showcase my portfolio and skills as a programmer. 
            This was my first real foray into web development, and I used this project to learn the basics, as well as some more advanced techniques. 
            It was built using React.js, with 3D elements from the Three.js library.

            <p>
                Unfortunately, because it was first real attempt at proper web development, it's a bit outdated. Thus, it has now been replaced by this website.
            </p>
        </>,
        features: <ul>
            <li>Extended version of my resume with more detailed information.</li>
            <li>Really bad 3D model I made by myself and it shows.</li>
            <li>List of all my relevant projects (like this).</li>
        </ul>,
        stack: ['react', 'three'],
        link: "https://github.com/joshbernsteint/joshbernsteint.github.io",
        completedDate: Date.parse('3/12/2023'),
        buttonProps: {
            image: url(websiteOneImage),
            children: "Website v1",
            imageProps:{
                backgroundColor: 'rgba(255,255,255,.25)', 
                backgroundPosition: 'center',
            }
        }
    },
    // angel
    {
        name: "angel",
        type: displayTypes.SOLO,
        title: "A.N.G.E.L.",
        subtitle: "Video Downloader and Converter",
        desc: <>
            I distrust a lot of those online converters, as I don't know what's going on in their backend, and what I am actually downloading.
            Thus, I decided to make my own platform for downloading and converting videos. 
            Ffmpeg allows you to convert video files between different types, either one at a time or as a group.

            <p>
                You can also download youtube videos to a MP4 file. When downloading, you can choose between different video and audio qualities. Using Electron, the project can be opened as an application on your desktop.   
            </p>
        </>,
        features: <ul>
            <li>Download YouTube videos at different video and audio quality levels.</li>
            <li>Convert between different video file types.</li>
            <li>Configure settings for a personalized experience.</li>
        </ul>,
        stack: ['electron', 'ffmpeg', 'react', 'express'],
        link: "https://github.com/joshbernsteint/ANGEL",
        completedDate: Date.parse('8/31/2023'),
        buttonProps: {
            image: url(angelImage),
            children: "A.N.G.E.L.",
            imageProps: {
                backgroundPosition: 'center',
            }
        }
    },
    // solar
    {
        name: "solar",
        type: displayTypes.GROUP,
        title: "Scrumptious Solar",
        subtitle: "Solar panel Management Portal",
        desc: <>
            A web platform for the management of solar panel installation. 
            A place where clients can view the progress of their installation, where contractors can view their tasks, and where Sales representatives can relay messages. 
            Also, managers can assign tasks and supervise the other users.

            <p>
                Sales representatives could chat with clients in our private message rooms, and direct them to payment through in-built stripe support.
            </p>
        </>,
        features: <ul>
            <li>Different user roles: Manager, Sales representative, construction worker, and end-customer.</li>
            <li>Manager can create and delete tasks for workers and representatives.</li>
            <li>Private chat and email service for communication between company and client.</li>
            <li>Payment can be given in the portal with Stripe.</li>
        </ul>,
        stack: ['react', 'express', 'firebase', 'socket', 'stripe'],
        link: "https://github.com/joshbernsteint/team11-scrumptious_7",
        completedDate: Date.parse('4/25/2023'),
        buttonProps: {
            image: url(solarImage),
            children: "Scrumptious Solar Services",
            imageProps: {
                backgroundBlendMode: 'darken',
                backgroundColor: 'rgba(0,0,0,.5)',
            }
        }
    },
    // ethel
    {
        name: 'ethel',
        type: displayTypes.SOLO,
        title: "E.T.H.E.L. Architecture",
        subtitle: "Simulated CPU & Assembler",
        desc: <>
            This project came in two parts: A simulated CPU and an assembly language to go with it. 
            Based on the ARM architecture, the CPU was constructed in Logisim evolution and consisted of 8 general purpose 64-bit registers.
            It doesn't have pipelining, but it does have full branching support. It uses a 32-bit instruction set for its instructions, which are generated by the custom assembler.

            <p>
                The assembly language is based loosely on ARMv8 assembly. However, the names of the instructions have been changed to dog themed ones (the project is named after my dog). 
                The assembler is written entirely in Python, and outputs a text file compatible with Logisim memory.
            </p>
        </>,
        features: <ul>
            <li>Operations using registers or immediate numbers.</li>
            <li>Load/Store data from/to memory.</li>
            <li>Full branching support, including branching and linking.</li>
        </ul>,
        stack: ['logisim', 'python'],
        link: "https://github.com/joshbernsteint/My-Projects/tree/main/ETHEL%20Assembler",
        completedDate: Date.parse('3/16/2023'),
        buttonProps: {
            children: "E.T.H.E.L. CPU & Assembler",
            image: url(ethelImage),
            imageProps: {
                backgroundBlendMode: 'darken',
                backgroundColor: 'rgba(0,0,0,.6)',
            }
        }
    },
    //arm
    {
        name: 'arm_helpers',
        type: displayTypes.SOLO,
        title: "ARMv8 Helpers",
        subtitle: 'VSCode Extension for Armv8 Assembly',
        desc: <>
            In my capacity as a course assistant, I found students often struggled with remembering the precise definitions of the <i>many</i> different assembly instructions.
            Thus, I wanted to devise a method that would fill students in and aid them in understanding these instructions. 
            By having instruction definitions, students can look at the description of any instruction they may not fully understand.

            <p>
                This extension also provides syntax highlighting, docstrings, macros, simple code completion, and more. 
                For a more detailed look at all the extension's features, see the project's <LinkButton link="https://github.com/joshbernsteint/arm_helpers/blob/main/README.md">README</LinkButton>.
            </p>
        </>,
        features: <ul>
            <li>Syntax highlighting and custom snippets, as well as code completion for instructions and custom labels</li>
            <li>Detailed definitions of numerous instructions.</li>
            <li>Docstring support to annotate procedures. These annotations will appear in completion prompts.</li>
        </ul>,
        stack: ['vscode', 'javascript'],
        link: 'https://github.com/joshbernsteint/arm_helpers',
        completedDate: Date.parse('9/28/2024'),
        buttonProps: {
            image: url(assemblyImage),
            children: "ARMv8 Helpers"
        }
    },
    // this
    {
        name: 'this',
        type: displayTypes.SOLO,
        title: "This Website",
        subtitle: "The old one had some cracks showing",
        desc: <>
            I simply needed a new place to showcase my skills and project portfolio. 
            My old portfolio was no longer indicative of my skills, so I created this site to be more representative of my current ability.
            The site is build with React.js, using the react-spring library for responsive and efficient animations. 
            Also, it uses the Three.js library for 3D rendering of the background stars. For styled components and icons, I used the Material UI library.

            <p>
                I aim to update this website into the future, adding new pages and features.
            </p>
        </>,
        features: <ul>
            <li>Description of myself and my abilites. Including my experience, education, skills, and projects.</li>
            <li>Custom 3D elements aimed to be as optimized as possible.</li>
            <li>Pictures of my dogs and cat (easily the best part).</li>
        </ul>,
        stack: ['react', 'spring', 'three', 'mui', 'typescript'],
        link: 'https://github.com/joshbernsteint/portfolio',
        completedDate: Date.now(),
        buttonProps: {
            image: url(thisImage),
            children: 'This website',
            imageProps: {
                backgroundColor: 'rgba(255,255,255,.15)',
            }
        },
    },
    // cs games
    {
        name: 'cs_games',
        type: displayTypes.SOLO,
        link: 'https://github.com/joshbernsteint/cs-games',
        completedDate: Date.parse('6/6/2024'),
        title: "CS Games",
        subtitle: "A Puzzle Competition Platform",
        desc: <>
            CS Games is a bi-yearly event hosted by the Computer Science club at Stevens Institute of Technology. 
            It's essentially a puzzle competition where teams of 3 compete to solve a series of puzzles first. To host the games, we needed a web platform to accomodate the puzzles themself (as many of them were programming-based).
            
            <p>
                There was a previous website used by the club, however, it became unavailable to use shortly before the games were set to take place.
                Thus, I took it upon myself to build a new website that was capable of handling 200+ concurrent users. 
                Users are able to create and join teams, and different team members can play across different devices and their results will be shared.
            </p>

            <p>
                <b>Note: </b>this project is no longer being maintaned by myself as I handed it over to the current members of the computer science club.
            </p>
        </>,
        features: <ul>
            <li>Registered users can create and join teams (maximum of 3 members per team).</li>
            <li>Administrators can modify the number of currently available puzzles.</li>
            <li>Puzzles can be dynamically edited while the website is running by admins (in case there is an error in the question).</li>
        </ul>,
        stack: ['react', 'express', 'mongo'],
        buttonProps: {
            image: url(csGamesImage),
            children: "CS Games",
            imageProps: {
                backgroundPosition: 'center',
                backgroundColor: 'rgba(255,255,255,.25)'
            }
        }
    },
    // Algebropiler
    {
        name: 'algebropiler',
        type: displayTypes.GROUP,
        title: "Relational Algebropiler",
        subtitle: "Extended-Syntax SQL Compiler",
        desc: <>
            A compiler for converting relational algebraic expresions to an executable file that will give the result of the expression (or query).       
            Compiler was specifically designed to compile a new &Phi; (Phi) operator that allows for a complete decoupling of aggregates and "group by" clauses. 
            For more information on this, the you can check out <LinkButton link="https://ieeexplore.ieee.org/abstract/document/787619">this paper</LinkButton>.
            <p>
                This project was written entirely in Vanilla C and is capable of running on any platform with a C compiler. 
                For data entry, it uses csv files, and for query entry it can either read a file or there is a command line interface option. 
                By leveraging C's inherit speed and efficiency, the queries are able to run incredibly quickly. 
                Additionally, a very light extension was created for VSCode that adds syntax highlighting and completion for the new &Phi; operator.
            </p>
        </>,
        features: <ul>
            <li>Constructs a compilable C file that will run the given query, precomputing information such as the maximum number of rows to save memory resources when running.</li>
            <li>Helpful CLI to guide users with explanations of the different parts of the query.</li>
            <li>VSCode extension that adds syntax highlighting and basic code completion.</li>
        </ul>,
        stack: ['c'],
        link: 'https://github.com/joshbernsteint/Algebropiler',
        completedDate: Date.parse('5/22/2024'),
        buttonProps: {
            image: url(algebropilerImage),
            children: 'Algebropiler',
            imageProps: {
                backgroundColor: 'rgba(0,0,0,.5)',
                backgroundBlendMode: 'darken',
            }
        }
    }
];

const svgMap = Object.fromEntries(
    Object.keys(stackMap).map(s => 
        ([s, <img src={svgs[s]} style={{display: 'inline', height: '75px', margin: '0rem 1rem'}}/>])
));


const projectMap : {[name: string] : Project} = (() => {
    const obj : {[name: string]: Project} = {};
    for(let i = 0; i < projects.length; i++) {
        const el = projects[i];
        obj[el.name] = el;
    }
    return obj;
})();

const Subheader = ({children} : {children?: ReactNode}) => (
    <Typography variant="h4" sx={{fontWeight: 300, textUnderlineOffset: '.75rem', textDecoration: 'underline'}}>
        {children}
    </Typography>
);

export default function Projects({scrollRef} : {scrollRef: React.MutableRefObject<HTMLDivElement | undefined>}){

    const [inView, visRef] = useVisible(true, true);
    const [displayType, setDisplayType] = useState<displayTypes>(displayTypes.ALL);
    const [ascendingOrder, setAscendingOrder] = useState<boolean>(false);
    const [currentProject, setCurrentProject] = useState<string>('');
    const projectRef = useRef<any>();

    const projectButtons = useMemo(() => projects.map((p,i) => (
        <ImageButton key={i} {...p.buttonProps} otherProps={{onClick: () => setCurrentProject(p.name)}}/>
    )), []);

    const displayedProjects = useMemo<boolean[]>(() => 
        projects.map(e => (
            (displayType === displayTypes.ALL) || (e.type === displayType)
    )), [displayType]);

    const sortedProjectsOrder = useMemo<number[]>(() => {
        const result : number[] = new Array(projects.length).fill(0).map((_,i) => i);
        result.sort((i1,i2) => {
            const a = projects[i1];
            const b = projects[i2];
            return (ascendingOrder ? a.completedDate - b.completedDate : b.completedDate - a.completedDate)
        })

        return result;
    }, [ascendingOrder]);
    
    const selectedProject = useMemo(() => {
        const p = projectMap[currentProject];
        if(!p) return null;

        return {
            ...p,
            date: getMonthYear(p.completedDate),
        };
    }, [currentProject]);

    useEffect(() => {
        if(projectRef.current){
            const r = projectRef.current as HTMLDivElement;
            r.scrollTo({top: 0, behavior: 'instant'});
        }
    }, [selectedProject]);

    const titleSpring = useSpring({
        opacity: inView ? 1 : 0,
        x: inView ? 0 : -20,
        config: {duration: 300}
    });

    const [buttonsTrail] = useSprings(3, i => ({
        opacity: inView ? 1 : 0,
        delay: 250 + (i*250),
    }), [inView]);

    const projectsTrail = useTrail(projects.length, ({
        opacity: inView ? 1 : 0,
        delay: 500,
    }))
    
    

    return (
        <div 
            id="projects"
            className="sectionBlock"
            style={{height: '100vh'}}
        >
            <Grid container sx={{width: '100%', height: '100vh'}}>
                <Grid size={4} sx={{height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto'}}>
                    <div 
                        style={{height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', overflow: 'auto'}} 
                    >
                        <AType variant="h1" style={{height: 'auto', textAlign: 'center', marginTop: '2rem', ...titleSpring}} opacity={titleSpring.opacity}>
                            Projects
                        </AType>
                        <div style={{height: 'auto', margin: '3rem 0rem', color: 'white', fontSize: '14pt', display: 'flex', flexDirection: 'column', overflow: 'auto'}}>
                            <a.div style={{fontSize: '10pt', textAlign: 'left', width: '100%', ...buttonsTrail[0]}}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={displayType}
                                    exclusive
                                    onChange={(_, val) => {
                                        if(val != null)
                                            setDisplayType(val as displayTypes);
                                    }}
                                >
                                    <ToggleButton value={displayTypes.ALL}>
                                        All
                                    </ToggleButton>
                                    <ToggleButton value={displayTypes.GROUP}>
                                        Group
                                    </ToggleButton>

                                    <ToggleButton value={displayTypes.SOLO}>
                                        Solo
                                    </ToggleButton>
                                    
                                </ToggleButtonGroup>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={ascendingOrder}
                                    sx={{float: 'right'}}
                                    exclusive
                                    onChange={(_, val) => setAscendingOrder(v => typeof val === "boolean" ? val : v)}
                                >
                                    <Tooltip title={<span style={{fontSize: '12pt'}}>Sort Ascending (Earliest &rarr; latest)</span>} arrow enterDelay={250}>
                                        <ToggleButton value={true}>
                                                <NorthIcon  fontSize="inherit"/>
                                                <SortIcon />
                                        </ToggleButton>
                                    </Tooltip>
                                    <Tooltip title={<span style={{fontSize: '12pt'}}>Sort Descending (Latest &rarr; Earliest)</span>} arrow enterDelay={250}>
                                        <ToggleButton value={false}>
                                            <SouthIcon  fontSize="inherit"/>
                                            <SvgIcon sx={{transform: 'scale(1,-1)'}}>
                                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
                                            </SvgIcon>
                                        </ToggleButton>
                                    </Tooltip>
                                </ToggleButtonGroup>
                            </a.div>
                                    
                            <a.div style={{overflow: 'auto', marginTop: '.5rem', ...titleSpring}}>
                            {
                                sortedProjectsOrder.map((i, idx) => displayedProjects[i] && <a.span style={{...projectsTrail[idx]}} key={i}>{projectButtons[i]}</a.span>)
                            }
                            </a.div>
                        </div>
                    </div>
                </Grid>

                <Grid size={8}>
                    {
                        selectedProject ? (
                            <div style={{padding: '5rem', paddingTop: '8rem', paddingBottom: 0, display: 'flex', flexDirection: 'column', height: '100vh'}}>                                
                                <div>
                                    {/* Top Half of title*/}
                                    <div>
                                        <Typography variant="h2" sx={{display: 'inline'}}>
                                            {selectedProject.title}
                                        </Typography>
                                        <Button 
                                            sx={{fontSize: '20pt', padding: '0rem 1rem', float: 'right', marginTop: '1rem'}} 
                                            variant="outlined" 
                                            color="primary"
                                            endIcon={<span style={{fontSize: '20pt', lineHeight: '10pt'}}><OpenInNewIcon fontSize="inherit"/></span>}
                                            target="_blank"
                                            href={selectedProject.link}
                                        >
                                            GitHub
                                        </Button>
                                </div>

                                {/* Bottom half of title*/}
                                <div style={{lineHeight: '45px', height: '40px'}}>
                                    <Typography variant='h5' sx={{fontStyle: 'italic', display: 'inline', verticalAlign: 'middle'}}>
                                        {selectedProject.subtitle}
                                    </Typography>
                                    <Typography sx={{fontWeight: '300', float: 'right', display: 'inline', verticalAlign: 'middle'}} variant="h4">
                                        {selectedProject.date}
                                    </Typography>
                                </div>
                                <hr/><br/>
                                </div>

                                <div style={{flexGrow: 1, overflowY: 'auto'}} ref={projectRef}>
                                    <Subheader>Description</Subheader>
                                    <p />
                                    {selectedProject.desc}

                                    <Subheader>Features</Subheader>
                                    {selectedProject.features}


                                    <Subheader>Technologies</Subheader> <br/>
                                    <div style={{padding: '0rem'}}>
                                        {selectedProject.stack?.map((e: string, i: number) => (
                                            <Tooltip title={<span style={{fontSize: '14pt'}}>{stackMap[e].name}</span>} key={i}>
                                                <Button href={stackMap[e].link} target="_blank">
                                                    {svgMap[e]}
                                                </Button>
                                            </Tooltip>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{display: 'flex', alignItems: 'center', height: '100%', width: '100%'}} ref={scrollRef as React.MutableRefObject<HTMLDivElement>}>
                                <div style={{verticalAlign: 'middle', textAlign: 'center', width: '50%', margin: 'auto'}} ref={visRef}>
                                    <AType variant={'h4'} opacity={buttonsTrail[1].opacity}>
                                        Select a Project from the list on the left to view a project.
                                    </AType>
                                    <br/>
                                    <AType opacity={buttonsTrail[2].opacity}>
                                        <span style={{fontSize: '14pt'}}>
                                        You can also filter by projects done in a group, solo, or both. 
                                        Additionally, you can sort projects by their completion date.
                                        </span>
                                    </AType>
                                </div>
                            </div>
                        )
                    }
                </Grid>
            </Grid>

        </div>
    );
}