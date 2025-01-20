import { Button, FormControl, Grid2 as Grid, MenuItem, Select, SvgIcon, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import React, { ReactNode, useMemo, useState } from "react";


// Image Imports
import algoRacerImage from '../assets/projects/algoracer.png';
import coverAIImage from '../assets/projects/coverai.png';
import rhythmImage from '../assets/projects/rhythm.png';
import angelImage from '../assets/projects/angel.png';
import solarImage from '../assets/projects/team11.png';
import websiteOneImage from '../assets/projects/website_v1.png';
import ethelImage from '../assets/projects/ethel_cpu.png';
import assemblyImage from '../assets/projects/arm.png';
import thisImage from '../assets/projects/this.png';
import csGamesImage from '../assets/projects/cs_games.png';
import algebropilerImage from '../assets/projects/algebropiler.png';

import ImageButton, { ImageButtonProps } from "../components/ImageButton.tsx";
import SortIcon from '@mui/icons-material/Sort';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import { getMonthYear } from "../utils/Date.ts";

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
    type: displayTypes,
    link: string,
    buttonProps: ImageButtonProps,
    completedDate: number,
    techs?: string[],
    description?: (string | ReactNode)[],
}

const projects : Project[] = [
    {
        name: "coverai",
        title: "CoverAI",
        subtitle: "Automated Cover Letter Generation",
        type: displayTypes.GROUP,
        link: "https://github.com/joshbernsteint/CoverAI",
        completedDate: Date.parse('4/26/2024'),
        buttonProps: {
            children: "CoverAI",
            image: url(coverAIImage)
        }
    },
    {
        name: "algoracer",
        title: "AlgoRacer",
        subtitle: "Algorithm Learning Game",
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
    {
        name: "rhythm_game",
        type: displayTypes.GROUP,
        title: "Rhythm Game",
        subtitle: "Typing Rhythm Game",
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
    {
        name: "website_v1",
        type: displayTypes.SOLO,
        title: "My Website",
        subtitle: "Well, the first version",
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
    {
        name: "angel",
        type: displayTypes.SOLO,
        title: "A.N.G.E.L.",
        subtitle: "Video Downloader and Converter",
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
    {
        name: "solar",
        type: displayTypes.GROUP,
        title: "Scrumptious Solar Services",
        subtitle: "Solar panel Management Portal",
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
    {
        name: 'ethel',
        type: displayTypes.SOLO,
        title: "E.T.H.E.L. Architecture",
        subtitle: "Simulated CPU & Assembler",
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
    {
        name: 'arm_helpers',
        type: displayTypes.SOLO,
        title: "Armv8 Helpers",
        subtitle: 'VSCode Extension for Armv8 Assembly',
        link: 'https://github.com/joshbernsteint/arm_helpers',
        completedDate: Date.parse('9/28/2024'),
        buttonProps: {
            image: url(assemblyImage),
            children: "ARMv8 Helpers"
        }
    },
    {
        name: 'this',
        type: displayTypes.SOLO,
        title: "This Website",
        subtitle: "The old one had some cracks showing",
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
    {
        name: 'cs_games',
        type: displayTypes.SOLO,
        link: 'https://github.com/joshbernsteint/cs-games',
        completedDate: Date.parse('6/6/2024'),
        title: "CS Games",
        subtitle: "A Puzzle Competition Platform",
        buttonProps: {
            image: url(csGamesImage),
            children: "CS Games",
            imageProps: {
                backgroundPosition: 'center',
                backgroundColor: 'rgba(255,255,255,.25)'
            }
        }
    },
    {
        name: 'algebropiler',
        type: displayTypes.GROUP,
        title: "Relational Algebropiler",
        subtitle: "Extended-Syntax SQL Compiler",
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

const projectMap : {[name: string] : Project} = (() => {
    const obj : {[name: string]: Project} = {};
    for(let i = 0; i < projects.length; i++) {
        obj[projects[i].name] = projects[i];
    }
    return obj;
})();

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
    }, [ascendingOrder])

    // console.log(currentProject, projectMap[currentProject]);
    
    const selectedProject = useMemo(() => {
        const p = projectMap[currentProject];
        return {
            ...p,
            date: getMonthYear(p.completedDate),
        };
    }, [currentProject]);


    return (
        <div 
            id="projects"
            className="sectionBlock"
            ref={scrollRef as React.MutableRefObject<HTMLDivElement>}
            style={{height: '100vh'}}
        >
            <Grid container sx={{width: '100%', height: '100vh'}}>
                <Grid size={4} sx={{height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto'}}>
                    <div style={{height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', overflow: 'auto'}}>
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
                                    onChange={(_, val) => setAscendingOrder(val as boolean)}
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
                            <div style={{marginTop: '5rem',padding: '5rem'}}>
                                <Typography variant="h2">
                                    {selectedProject.title}
                                </Typography>
                                <Typography variant='h5' sx={{fontStyle: 'italic'}}>
                                    {selectedProject.subtitle}
                                </Typography><br/>
                                <Typography variant="body1" sx={{fontSize: '16pt'}}>
                                    {selectedProject.date}
                                </Typography>
                            </div>
                        )
                    }
                </Grid>
            </Grid>

        </div>
    );
}