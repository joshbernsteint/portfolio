import { Avatar, Button, Pagination, Paper, Tooltip, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useVisible, useWindow } from "../utils/Hooks";
import React, { ReactNode, useState } from "react";
import {a, config, useSpring, useTrail} from '@react-spring/web';

// Image imports
import imageMap from "../assets/images/about";
import githubImg from '../assets/images/about/gitHub.png';
import linkedInImg from '../assets/images/about/linkedIn.png';
import AType from "../components/animated/AnimatedTypography.tsx";

const activeImageList = imageMap.map(i => <img {...i} width={"80%"} style={{borderRadius: '10px', border: '.5px solid white', padding: '.25rem'}}/>);

type AboutProps = {
    // scrollRef: any,
    textWidth?: number,
    scrollRef: any,
    style?: React.CSSProperties,
    [prop: string]: any,
};


export default function About({textWidth=0.6, scrollRef, style={}} : AboutProps){

    const {width} = useWindow();
    const [activeImage, setActiveImage] = useState<number>(0);
    const [inView, visRef] = useVisible(true, true);

    const profileVisible = width > 1200;
    const isMiniVisible = !profileVisible && width > 875;
    const textSize : number = textWidth * 12;  
    const imageSize: number = 12 - textSize;

    const [textSprings] = useTrail(7, i => ({
        opacity: inView ? 1 : 0,
        delay: i*500 + 500,
        width: inView ? '100%' : '0%',
    }), [inView]);

    const titleSpring = useSpring({
        opacity: inView ? 1 : 0,
        x: inView ? 0 : 40,
        y: inView ? 0 : -15,
        config: {clamp: true, ...config.gentle}
    });

    const imageSpring = useSpring({
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 20,
        x: inView ? 0 : -30,
        delay: 1000,
    })

    return (
        <a.div className="sectionBlock" id="about" style={style} ref={scrollRef}>
            <Grid container spacing={2} sx={{padding: '2rem'}}>
                <Grid size={profileVisible ? textSize : 12}>
                        <Grid container spacing={2}>
                            <Grid size={9}>
                                <a.div style={{...titleSpring}}>
                                    <Typography variant="h1">
                                        About Me
                                    </Typography>
                                </a.div>
                            </Grid>
                            <Grid size={3}>
                                <Paper
                                    sx={{
                                        width: '120px', 
                                        height: '120px', 
                                        borderRadius: '50%', 
                                        display: 'flex', 
                                        alignContent: 'center', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        visibility: isMiniVisible ? 'visible' : 'hidden'
                                    }}
                                    elevation={2}
                                >
                                    <Avatar {...imageMap[0]} sx={{width: 100, height: 100}}/>
                                </Paper>
                            </Grid>
                        </Grid>
                        <br/>

                        <AType opacity={textSprings[0].opacity}>
                            <span style={{fontSize: '24pt'}}>Hello! </span> 
                            I'm Josh, currently a 21-year-old 4th year Computer Science major at Stevens Institute of Technology in Hoboken, NJ. 
                            I will be graduating with my Master's degree in May with a Master's in Computer Science. I have a particular interest in web development
                            with tools like React and Node.js,
                            and low-level programming in C/C++. I've been programming for over 7 years now, in a variety of languages (most notably: C, C++, Python, Java, and Javascrpt)
                            , and yet it never stops getting any less interesting!  
                        </AType><br/>
                        <AType opacity={textSprings[1].opacity}>
                            I describe myself as a nerd, being a huge fan of franchises like Lord of the Rings and Star Wars. 
                            I enjoy playing video games in my spare time, as well as working on whatever my current programming project happens to be.
                            Also, I love spending time with my pets. I have two dogs, Ethel and Angel (the name is very ironic), 
                            and a cat, Gigi. Is that too many you ask? What an absurd thing to say!
                        </AType> <br/>
                        <AType opacity={textSprings[2].opacity}>
                            Over the last 5 years, I've worked as a volunteer for The Seeing Eye, working to raise guide dogs for the blind. 
                            My two dogs are actually retired Seeing Eye dogs, and are now licensed as therapy dogs to continue helping people.
                            In terms of technical experience, I've worked as a student developer since Summer 2021, where I worked on a data anaylsis project. 
                            As of now, I'm working both as a course assistant for the Assembly and introductory C course (CS 382 if you're interested), and as a javascript developer
                            on a research project. 
                        </AType> <br/><br/>

                        <AType opacity={textSprings[3].opacity}>
                            Currently, I am looking for a software developer or engineer full-time position starting Summer 2025.
                        </AType> <br/>
                        
                        <a.hr style={{marginLeft: 0, ...textSprings[4]}}/>
                        <div style={{marginTop: '1rem'}}>
                            <a.span style={{opacity: textSprings[5].opacity}} ref={visRef}>
                                <Button variant="contained" color="primary" sx={{height: '42px', margin: '.1rem'}} href="https://github.com/joshbernsteint" target="_blank">
                                    Check me out on <img src={githubImg} width={50}/>
                                </Button>
                            </a.span>{' '}
                            <a.span style={{opacity: textSprings[6].opacity}}>
                                <Button variant="contained" color="primary" sx={{height: '42px', margin: '.1rem'}} href="https://www.linkedin.com/in/joshua-bernstein-9700261b0/" target="_blank">
                                    Connect with me on <img src={linkedInImg} width={80} style={{marginLeft: '.5rem'}}/>
                                </Button>
                            </a.span>
                        </div>
                </Grid>
                {
                    profileVisible && (
                        <Grid size={imageSize}>
                            <a.div style={{marginTop: '5%', justifyContent: 'center', textAlign: 'center', alignContent: 'center', display: 'flex', flexFlow: 'wrap', ...imageSpring}}>
                                <Tooltip title={<span style={{fontSize: '12pt'}}>{imageMap[activeImage].alt}</span>} followCursor>
                                    {activeImageList[activeImage]}
                                </Tooltip>
                                <Pagination 
                                    count={imageMap.length} 
                                    sx={{marginTop: '.5rem'}} 
                                    onChange={(_, page: number) => setActiveImage(page - 1)}
                                />
                            </a.div>
                        </Grid>
                    )
                }
            </Grid>
        </a.div>
    );
}