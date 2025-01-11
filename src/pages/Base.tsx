import { useEffect, useRef, useState} from 'react'
import Galaxy from '../threeModels/stars/Galaxy';
import About from '../pages/About';
import Education from './Education';
import Skills from './Skills';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import StarBackground from '../threeModels/stars/StarBackground';
import EducationThree from '../threeModels/subpages/Education';
import { useFPS, useScroll, useWindow } from '../utils/Hooks';
import { Button, Typography } from '@mui/material';
import GridLayout from '../components/GridLayout';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import MyView from '../threeModels/MyView';
import DoublePaper from '../components/DoublePaper';
import SectionLabel from '../components/SectionLabel';
import Experience from './Experience';
import Education2 from './Education2';

function FPSCounter({onFail=() => {}, ...props}){
  useFPS({onFail});
  return <></>;
}


enum pageVersion{
  noThree,
  default,
  small,
};


function ScrollButton({scrollRef, color='primary', label='empty'} : {scrollRef: any, color?: any, label?: string}){
  return (
    <Button 
    variant='contained'
    color={color}
    sx={{minWidth: '50%', fontSize: '20pt', fontWeight: 400, margin: '.5rem'}}
    onClick={() => {
      scrollRef.current.scrollIntoView();
    }}
    >
    {label}
  </Button>
  )
}


export default function BasePage(){
  

  // For jumping to sections
  const aboutRef = useRef<any>();
  const educationRef = useRef<any>();
  const skillsRef = useRef<any>();
  const projectsRef = useRef<any>();
  const experienceRef = useRef<any>();


  // For tracking viewport
  const containerRef = useRef<any>();
  const galaxyView = useRef<any>();
  const starView = useRef<any>();


  const [version, setVersion] = useState<pageVersion>(pageVersion.default);
  const windowSize = useWindow(({width}) => {
    if(width < 1798){
      setVersion(pageVersion.small);
    }
    else{
      setVersion(pageVersion.default);
    }
  });

  const noThree = (version === pageVersion.noThree);
  const smallVersion = (version === pageVersion.small) || noThree;
  const superSmall = windowSize.aspect < 0.8;




  return (
    <div style={{width: "100%", height: "100%", backgroundColor: "#15181a", position: 'relative'}} ref={containerRef}>
      {/* Background Viewports */}
      
      <div id='viewports' style={{width: '100%', height: '100%', position: 'absolute', zIndex: 11, padding: 0, margin: 0}}>
        <div ref={galaxyView} style={{width: '100%', height: '100%'}}/>
        {/* <div ref={experienceRef} style={{width: '100%', height: '100%'}}/> */}
      </div>

        <div id='viewports_bg' style={{width: '100%', height: '100%', position: 'absolute', zIndex: 4, padding: 0, margin: 0, top: 0}}>
          <div ref={starView} style={{width: '100%', height: '100%', position: 'fixed'}}/>
        </div>


      {
          noThree && (
            <div style={{position: 'absolute', textAlign: 'left', height: '100vh',top: '30%', padding: '2rem', width: '100%', zIndex: 10}}>
              <GridLayout>
                <div style={{textAlign: 'center'}}>
                    <Typography variant='h1' sx={{fontWeight: 'bold'}}>
                    Joshua Bernstein
                  </Typography>
                  <Typography variant='h4'>
                    Programmer | Dog Dad | Huge Nerd
                  </Typography>
                </div>
                <div style={{position: 'absolute',width: '50%', top: '-10%', alignItems: 'center', justifyContent: 'center', alignContent: 'center', textAlign: 'center'}}>
                    <ScrollButton label='About Me' scrollRef={aboutRef}/> <br/>
                    <ScrollButton label="Education" scrollRef={educationRef} color="success"/> <br/>
                    <ScrollButton label="Experience" scrollRef={experienceRef} color="warning"/> <br/>
                    <ScrollButton label="Skills" scrollRef={experienceRef} color="secondary"/> <br/>
                    <ScrollButton label="Projects" scrollRef={projectsRef} color="info"/> <br/>
                </div>
              </GridLayout>
            </div>
          )
        }

      {/* Text Content */}
      <div style={{position: 'absolute', zIndex: 10, height: '100%', width: '100%', top: 0, left: 0}}>
        <div style={{height: '100vh'}}/>
        <About scrollRef={aboutRef}/>
        {/* <div style={{height: '100vh'}} ref={educationRef}/> */}
        <Education2 scrollRef={educationRef} />
        <Experience scrollRef={experienceRef}/>
      </div>


      
        {
          !noThree && (
            <div id='canvas_container' style={{top: 0, left: 0, width: '100%', height: '100%', position: 'fixed', zIndex: 0}}>
            <Canvas eventSource={containerRef} linear flat dpr={[1,2]}>
              <FPSCounter onFail={() => {
                setVersion(pageVersion.noThree);
              }}/>
              {/* Centerpiece */}
              <View track={galaxyView} index={0}>
                <Galaxy 
                  scrollRefs={{
                    about: aboutRef,
                    education: educationRef,
                    skills: skillsRef,
                    projects: projectsRef,
                    experience: experienceRef,
                  }}
                />
              </View>
    
              {/* Education */}
              {/* <MyView track={educationRef} index={1}>
                {!smallVersion && <EducationThree />}
              </MyView> */}



              <StarBackground track={starView} index={1} numStars={400} 
                starProps={{
                  // radiusRange: [.05,.2],
                  }}
                />
            </Canvas>
            </div>
          )
        }
    </div>
  )
}
