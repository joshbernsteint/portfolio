import { useRef, useState } from 'react'
import Galaxy from '../threeModels/Galaxy';
import About from '../pages/About';

function BasePage() {

  return (
    <div style={{width: "100%", height: "100%", backgroundColor: "#15181a"}}>
        <Galaxy/>
        <About />
    </div>
  )
}

export default BasePage;
