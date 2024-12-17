import { PerspectiveCamera, View } from "@react-three/drei";
import Stars, { StarsProps } from "./Stars";
import { ReactElement } from "react";

export type StarBackgroundProps = {
    numStars?: number,
    track?: React.MutableRefObject<any> | undefined,
    children?: any,
    starProps?: StarsProps
}

export default function StarBackground({numStars=250, track=undefined, children=[], starProps={}} : StarBackgroundProps){
  return (
    <View track={track}>
      <PerspectiveCamera makeDefault position={[0,0,200]} fov={90}/>
      <ambientLight intensity={.85} />
      <Stars 
          zPos={-100} 
          numStars={numStars}
          brightnessRange={[0.5, 1]} 
          radiusRange={[.1, .5]}
          {...starProps}
      />
      {children}
    </View>
  )
}