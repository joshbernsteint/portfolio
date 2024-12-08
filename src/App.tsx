import { useRef, useState } from 'react'
import './App.css'
import { useColorScheme } from '@mui/material'
import {Parallax, ParallaxLayer} from '@react-spring/parallax';
import Galaxy from './threeModels/Galaxy';
import About from './pages/About';


function App() {
  const {mode, setMode} = useColorScheme();

  const parallaxRef = useRef<any>(null);

  return (
    <div style={{ width: '100%', height: '100%', background: '#15181a'}}>
      <Parallax ref={parallaxRef} pages={3}>
        <ParallaxLayer offset={0} speed={1} factor={1}>
          <Galaxy scrollRef={parallaxRef} current={parallaxRef.current ? parallaxRef.current.current : 0}/>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0}>
          <About />
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}

export default App
