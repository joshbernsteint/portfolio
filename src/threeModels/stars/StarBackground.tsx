import { PerspectiveCamera, View } from "@react-three/drei";
import Stars, { StarsProps } from "./Stars";

export type StarBackgroundProps = {
    index: number,
    numStars?: number,
    track?: React.MutableRefObject<any> | undefined,
    children?: any,
    starProps?: StarsProps
}

export default function StarBackground({
  index, numStars=250, track=undefined, children=[], starProps={}
} : StarBackgroundProps){

  return (
    <View track={track} index={index}>
      <PerspectiveCamera makeDefault position={[0,0,200]} fov={90}/>
      <ambientLight intensity={.85} />
      <Stars 
          zPos={-100} 
          numStars={numStars}
          brightnessRange={[0.5, 1]}
          animate
          radiusRange={[.1, .5]}
          {...starProps}
      />
      {children}
    </View>
  )
}