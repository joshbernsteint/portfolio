import { useRef, useState } from 'react'
import { useColorScheme } from '@mui/material'
import {Parallax, ParallaxLayer} from '@react-spring/parallax';
import Galaxy from '../threeModels/Galaxy';
import About from '../pages/About';
import AnimatedSVG from '../components/AnimatedSVG';
import ReactSVGPath from '../assets/svg-paths/React'; 
import GitSVGPATH from '../assets/svg-paths/Git';
import NodeSVGPath from '../assets/svg-paths/Node';
import ExpressSVGPath from '../assets/svg-paths/Express';

function BasePage() {
  // const {mode, setMode} = useColorScheme();

  const parallaxRef = useRef<any>(null);


  return (
    <div style={{width: "100%", height: "100%"}}>
        <Galaxy scrollRef={parallaxRef} current={parallaxRef.current ? parallaxRef.current.current : 0}/>
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
  )
}

export default BasePage;
