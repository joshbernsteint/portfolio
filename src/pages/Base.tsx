import { useRef, useState } from 'react'
import Galaxy from '../threeModels/Galaxy';
import About from '../pages/About';
import Education from './Education';
import Skills from './Skills';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, View } from '@react-three/drei';
import Stars from '../threeModels/Stars';


export default function BasePage(){
  const aboutRef = useRef<any>();
  const educationRef = useRef<any>();
  const skillsRef = useRef<any>();
  const projectsRef = useRef<any>();
  const experienceRef = useRef<any>();

  const containerRef = useRef<any>();
  const galaxyView = useRef<any>();
  const starView = useRef<any>();

  

  return (
    <div style={{width: "100%", height: "100%", backgroundColor: "#15181a", position: 'relative'}} ref={containerRef}>

      {/* Background Viewports */}
      <div id='viewports' style={{width: '100%', height: '100%', position: 'absolute', zIndex: 5}}>
        <div ref={galaxyView} style={{width: '100%', height: '100%'}}/>
        <div ref={starView} style={{width: '100%', height: '200%'}}/>
      </div>

      {/* Text Content */}
      <div style={{position: 'absolute', zIndex: 10, top: '100%'}}>
        <About scrollRef={aboutRef}/>
        {/* <Education scrollRef={educationRef}/> */}
        <div ref={educationRef} className='sectionSpace'/>
        <div ref={skillsRef} className='sectionSpace'/>
      </div>


      <div id='canvas_container' style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0}}>
        <Canvas eventSource={containerRef} linear flat dpr={[1,2]}>
          <View track={galaxyView}>
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

          <View track={starView}>
            <PerspectiveCamera makeDefault position={[0,0,200]} fov={90}/>
            <ambientLight intensity={.85} />
            <Stars 
                zPos={-100} 
                numStars={500}
                brightnessRange={[0.5, 1]} 
                radiusRange={[.1, .5]} 
            /> 
          </View>

        </Canvas>
        </div>
    </div>
  )
}
