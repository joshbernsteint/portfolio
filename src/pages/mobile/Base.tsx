import { useRef } from "react";
import About from "../About.tsx";
import { Button, Stack, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Stars from "../../threeModels/stars/Stars.tsx";
import MobileEducation from "./Education.tsx";
import MobileExperience from "./Experience.tsx";
import MobileSkills from "./Skills.tsx";


export default function MobileBase({}){

    const aboutRef = useRef();
    const educationRef = useRef();
    const experienceRef = useRef();
    const skillsRef = useRef();
    const projectsRef = useRef();

    function scrollToElement(ref: React.MutableRefObject<any>){
        if(ref){
            const el = ref.current as HTMLDivElement;
            el.scrollIntoView({behavior: 'smooth'});
        }
    }

    return (
        <div style={{width: '100%', height: '100%', overflowX: 'hidden', display: 'relative'}}>

            <div style={{width: '100%', height: '100%', position: 'absolute', zIndex: 0, padding: 0, margin: 0, top: 0}}>
                <div style={{width: '100%', height: '100%', position: 'fixed'}}>
                    <Canvas linear flat dpr={[1,2]}>
                        <PerspectiveCamera makeDefault position={[0,0,200]} fov={90}/>
                        <ambientLight intensity={.85} />
                        <Stars 
                            zPos={-100} 
                            numStars={250}
                            brightnessRange={[0.5, 1]}
                            animate
                            radiusRange={[.1, .5]}
                        />
                    </Canvas>
                </div>
            </div>

            <div style={{position: 'absolute', zIndex: 10, overflowX: 'hidden'}}>
                <div className="sectionBlock" style={{textAlign: 'center'}}>
                    <Typography variant="h1" fontSize={'4rem'}>Joshua Bernstein</Typography>
                    <Typography variant="h5" fontSize={'1rem'}>Programmer | Dog Dad | Huge nerd</Typography>
                    <br/>
                    <Stack spacing={1}>
                        <Button variant="contained" sx={{width: '100%'}} onClick={() => scrollToElement(aboutRef)}>About</Button>
                        <Button variant="contained" sx={{width: '100%'}} onClick={() => scrollToElement(educationRef)}>Education</Button>
                        <Button variant="contained" sx={{width: '100%'}} onClick={() => scrollToElement(experienceRef)}>Experience</Button>
                        <Button variant="contained" sx={{width: '100%'}} onClick={() => scrollToElement(skillsRef)}>Skills</Button>
                        <Button variant="contained" sx={{width: '100%'}} onClick={() => scrollToElement(projectsRef)}>Projects</Button>
                    </Stack>
                </div>
                <About useSmall scrollRef={aboutRef} style={{padding: '2rem'}}/>
                <MobileEducation scrollRef={educationRef}/>
                <MobileExperience scrollRef={experienceRef}/>
                <MobileSkills scrollRef={skillsRef}/>
            </div>
        </div>
    );
}