import { useRef, useState } from 'react'
import Galaxy from '../threeModels/Galaxy';
import About from '../pages/About';

function BasePage() {

  const aboutRef = useRef();

  return (
    <div style={{width: "100%", height: "100%", backgroundColor: "#15181a"}}>
        <Galaxy 
          scrollRefs={{
            about: aboutRef,
          }}
        />
        <About scrollRef={aboutRef}/>
    </div>
  )
}

export default BasePage;
