import { Avatar, Button, Card, Pagination, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useWindow } from "../utils/Hooks";
import { useState } from "react";

// Image imports
import imageMap from "../assets/images/about";
import githubImg from '../assets/images/about/gitHub.png';
import linkedInImg from '../assets/images/about/linkedIn.png';
import DoublePaper from "../components/DoublePaper";
import SectionLabel from "../components/SectionLabel";

type AboutProps = {
    scrollRef: any,
    textWidth?: number,
    [prop: string]: any,
};

export default function About({scrollRef, textWidth=0.6, ...props} : AboutProps){

    const {width} = useWindow();
    const [activeImage, setActiveImage] = useState<number>(0);

    const profileVisible = width > 1200;
    const isMiniVisible = !profileVisible && width > 875;
    const textSize : number = textWidth * 12;  
    const imageSize: number = 12 - textSize;

    return (
        <div style={{marginTop: '10rem'}} className="sectionBlock" id="about" ref={scrollRef}>
            <Grid container spacing={2}>
                <Grid size={profileVisible ? textSize : 12} >
                    <DoublePaper>
                        <Grid container spacing={2}>
                            <Grid size={9}>
                                <SectionLabel label="About Me"/>
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
                        <Typography variant="h2" sx={{display: 'inline-block'}}>
                            Hello!
                        </Typography>{' '}
                        <Typography sx={{display: 'inline'}}>
                            I'm Josh, currently a 21-year-old 4th year Computer Science major at Stevens Institute of Technology in Hoboken, NJ. 
                            I will be graduating with my Master's degree in May with a Master's in Computer Science. I have a particular interest in web development
                            with tools like React and Node.js,
                            and low-level programming in C/C++. I've been programming for over 7 years now, in a variety of languages (most notably: C, C++, Python, Java, and Javascrpt)
                            , and yet it never stops getting any less interesting!
                        </Typography> <br/><br/>
                        <Typography>
                            I describe myself as a nerd, being a huge fan of franchises like Lord of the Rings and Star Wars. 
                            I enjoy playing video games in my spare time, as well as working on whatever my current programming project happens to be.
                            Also, I love spending time with my pets. I have two dogs, Ethel and Angel (the name is very ironic), 
                            and a cat, Gigi. Is that too many you ask? What an absurd thing to say!
                        </Typography> <br/>
                        <Typography>
                            Over the last 5 years, I've worked as a volunteer for The Seeing Eye, working to raise guide dogs for the blind. 
                            My two dogs are actually retired Seeing Eye dogs, and are now licensed as therapy dogs to continue helping people.
                            In terms of technical experience, I've worked as a student developer since Summer 2021, where I worked on a data anaylsis project. 
                            As of now, I'm working both as a course assistant for the Assembly and introductory C course (CS 382 if you're interested), and as a javascript developer
                            on a research project. 
                        </Typography> <br/> <br/>

                        <Typography>
                            Currently, I am looking for a software developer or engineer full-time position starting Summer 2025.
                        </Typography> <br/>
                        
                        <hr/><br/>
                        <Button variant="contained" color="primary" sx={{height: '42px'}} href="https://github.com/joshbernsteint" target="_blank">
                            Check me out on <img src={githubImg} width={50}/>
                        </Button>{' '}
                        <Button variant="contained" color="primary" sx={{height: '42px'}} href="https://www.linkedin.com/in/joshua-bernstein-9700261b0/" target="_blank">
                            Connect with me on <img src={linkedInImg} width={80} style={{marginLeft: '.5rem'}}/>
                        </Button>
                    </DoublePaper>
                </Grid>
                {
                    profileVisible && (
                        <Grid size={imageSize} sx={{justifyContent: 'center', textAlign: 'center', alignContent: 'center', display: 'flex', flexFlow: 'wrap'}}>
                            <img {...imageMap[activeImage]} width={"80%"} style={{borderRadius: '10px'}}/>
                            <span style={{width: '100%'}}></span>
                            <Pagination 
                                count={imageMap.length} 
                                sx={{marginTop: '.5rem'}} 
                                onChange={(_, page: number) => setActiveImage(page - 1)}
                            />
                        </Grid>
                    )
                }
            </Grid>
        </div>
    );
}