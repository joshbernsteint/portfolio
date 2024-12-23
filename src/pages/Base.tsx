import { useRef, useState} from 'react'
import Galaxy from '../threeModels/stars/Galaxy';
import About from '../pages/About';
import Education from './Education';
import Skills from './Skills';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import StarBackground from '../threeModels/stars/StarBackground';
import EducationThree from '../threeModels/subpages/Education';
import { useWindow } from '../utils/Hooks';



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
  const aboutView = useRef<any>();
  const educationView = useRef<any>();


  const windowSize = useWindow();
  const smallVersion = windowSize.width < 1798;
  const superSmall = windowSize.aspect < 0.8
  

  return (
    <div style={{width: "100%", height: "100%", backgroundColor: "#15181a", position: 'relative'}} ref={containerRef}>
      {/* Background Viewports */}
      <div id='viewports' style={{width: '100%', height: '100%', position: 'absolute', zIndex: 5, padding: 0, margin: 0}}>
        <div ref={galaxyView} style={{width: '100%', height: '100%'}}/>
        <div ref={aboutRef} style={{width: '100%', height: '110%'}}/>
        <div ref={educationRef} style={{width: '100%', height: '100%'}}/>
      </div>

      {/* Text Content */}
      <div style={{position: 'absolute',top: '100vh', marginTop: '10rem'}}>
        <div style={{position: 'relative', width: '100vw', height: '100vh'}}>
          <About style={{zIndex: 10, height: (superSmall ? '700px': '100vh')}}/>
          {smallVersion ? (
            <Education style={{zIndex: 10, top: '100vh', marginTop: '2rem'}}/>
          ) : (
            <div className='sectionSpace' style={{top: '100vh'}} id='about_space'/>
          )}
        </div>
      </div>


      <div id='canvas_container' style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0}}>
        <Canvas eventSource={containerRef} linear flat dpr={[1,2]}>
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

          {/* About background */}
          <StarBackground track={aboutRef} index={1}/>

          {/* Education */}
          <StarBackground track={educationRef} index={2}>
            {!smallVersion && <EducationThree />}
          </StarBackground>

        </Canvas>
        </div>
    </div>
  )
}
