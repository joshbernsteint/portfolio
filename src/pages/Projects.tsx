import { Button, Grid2 as Grid, SvgIcon, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import React, { ReactNode, useMemo, useState } from "react";


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
import ESet from "../utils/ESet.ts";


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
    title?: string,
    subtitle?: string,
    desc?: string | ReactNode,
    features?: string | ReactNode,
    stack?: string[],
    type: displayTypes,
    link: string,
    buttonProps: ImageButtonProps,
    completedDate: number,
    techs?: string[],
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

        </>,
        features: <ul>

        </ul>,
        stack: ['react', 'express', 'mongo', 'socket'],
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

        </>,
        features: <ul>

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

        </>,
        features: <ul>

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

        </>,
        features: <ul>

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
        title: "Scrumptious Solar Services",
        subtitle: "Solar panel Management Portal",
        desc: <>

        </>,
        features: <ul>

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

        </>,
        features: <ul>

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
        title: "Armv8 Helpers",
        subtitle: 'VSCode Extension for Armv8 Assembly',
        desc: <>

        </>,
        features: <ul>

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

        </>,
        features: <ul>

        </ul>,
        stack: ['react', 'three', 'mui', 'typescript'],
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

        </>,
        features: <ul>

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
            Compiler was specifically designed to compile a new &Phi; (Phi) operator that allows for a complete decoupling of aggregates and "group by" clauses. For more information on this, the you can check out <Button href="https://ieeexplore.ieee.org/abstract/document/787619" target="_blank" sx={{textTransform: 'none', padding: 0}}>this paper</Button>.
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


const uniqueStacks : ESet<string> = new ESet<string>();
projects.forEach(e => uniqueStacks.addArray(e.stack || []));
console.log(uniqueStacks.toArray());


const projectMap : {[name: string] : Project} = (() => {
    const obj : {[name: string]: Project} = {};
    for(let i = 0; i < projects.length; i++) {
        obj[projects[i].name] = projects[i];
    }
    return obj;
})();


const Subheader = ({children} : {children?: ReactNode}) => (
    <Typography variant="h4" sx={{fontWeight: 300, textUnderlineOffset: '.75rem', textDecoration: 'underline'}}>
        {children}
    </Typography>
);

export default function Projects({scrollRef} : {scrollRef: React.MutableRefObject<HTMLDivElement | undefined>}){

    const [displayType, setDisplayType] = useState<displayTypes>(displayTypes.ALL);
    const [ascendingOrder, setAscendingOrder] = useState<boolean>(false);
    const [currentProject, setCurrentProject] = useState<string>('');

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
                        ref={scrollRef as React.MutableRefObject<HTMLDivElement>}
                    >
                        <Typography variant="h1" sx={{height: 'auto', textAlign: 'center', marginTop: '2rem'}}>
                            Projects
                        </Typography>
                        <div style={{height: 'auto', margin: '3rem 0rem', color: 'white', fontSize: '14pt', display: 'flex', flexDirection: 'column', overflow: 'auto'}}>
                            <div style={{fontSize: '10pt', textAlign: 'left', width: '100%'}}>
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
                            </div>
                                    
                            <div style={{overflow: 'auto', marginTop: '.5rem'}}>
                            {
                                sortedProjectsOrder.map((i) => displayedProjects[i] && projectButtons[i])
                            }
                            </div>
                        </div>
                    </div>
                </Grid>

                <Grid size={8}>
                    {
                        selectedProject && (
                            <div style={{padding: '5rem', paddingTop: '8rem', paddingBottom: 0, height: '100%'}}>                                
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

                                <Subheader>Description</Subheader>
                                {selectedProject.desc}

                                <Subheader>Features</Subheader>
                                {selectedProject.features}


                                <Subheader>Technologies</Subheader> <br/>
                                <div style={{padding: '0rem'}}>
                                    {selectedProject.stack?.map((e: string, i: number) => (
                                        <Tooltip title={<span style={{fontSize: '14pt'}}>{stackMap[e].name}</span>} key={i}>
                                            <Button href={stackMap[e].link} target="_blank">
                                                <img src={svgs[e]} style={{display: 'inline', height: '75px', margin: '0rem 1rem'}} key={i}/>
                                            </Button>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </Grid>
            </Grid>

        </div>
    );
}