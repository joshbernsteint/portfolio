import { Avatar, Card, Pagination, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useWindow } from "../utils/Hooks";
import { useState } from "react";

// Image imports
import imageMap from "../assets/images/about";

export default function About({...props}){

    const {width} = useWindow();
    const [activeImage, setActiveImage] = useState<number>(0);

    const profileVisible = width > 1200;
    const isMiniVisible = !profileVisible && width > 875;    

    return (
        <div style={{color: '#C0C0C0',  backgroundColor: '#15181a', paddingTop: '10rem', padding: '2rem'}} id="about">
            <Grid container spacing={4}>
                <Grid size={profileVisible ? 6 : 12} >
                    <Paper elevation={2} style={{padding: '1rem', color: '#c0c0c0', borderRadius: '10px'}}>
                        <Paper elevation={3} sx={{padding: '1.5rem'}}>
                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    <Typography variant="h1">
                                        About   
                                    </Typography>
                                </Grid>
                                <Grid size={6}>
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
                        </Paper>
                    </Paper>
                </Grid>
                {
                    profileVisible && (
                        <Grid size={6} sx={{justifyContent: 'center', textAlign: 'center', alignContent: 'center', display: 'flex', flexFlow: 'wrap'}}>
                            <img {...imageMap[activeImage]} width={"80%"} style={{borderRadius: '10px'}}/>
                            <Pagination 
                                count={imageMap.length} 
                                sx={{marginTop: '.5rem'}} 
                                onChange={(_, page: number) => setActiveImage(page - 1)}
                            />
                        </Grid>
                    )
                }
            </Grid>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}