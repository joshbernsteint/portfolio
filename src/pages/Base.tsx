import { useRef, useState } from 'react'
import Galaxy from '../threeModels/Galaxy';
import About from '../pages/About';
import Education from './Education';
import Skills from './Skills';

function BasePage() {

  const aboutRef = useRef();
  const educationRef = useRef();
  const projectsRef = useRef();
  const experienceRef = useRef();
  const skillsRef = useRef();

  return (
    <div style={{width: "100%", height: "100%", backgroundColor: "#15181a", position: 'relative'}}>
        <Galaxy 
          scrollRefs={{
            about: aboutRef,
            education: educationRef,
          }}
        />
        {/* <div style={{position: 'absolute', zIndex: 10}}>
          <About scrollRef={aboutRef} textWidth={0.6}/>
          <Education scrollRef={educationRef}/>
          <Skills scrollRef={skillsRef}/>
        </div> */}
    </div>
  )
}

export default BasePage;
