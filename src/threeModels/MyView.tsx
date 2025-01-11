import { PerspectiveCamera, View } from "@react-three/drei";

export default function MyView({track=undefined, index=-1, children=[], lightIntensity=.85}: {
    track: React.MutableRefObject<HTMLElement> | undefined,
    lightIntensity?: number,
    index: number,
    children?: any,
}){
    return (
        <View track={track} index={index}>
            <PerspectiveCamera makeDefault position={[0,0,200]} fov={90}/>
            <ambientLight intensity={lightIntensity} />
            {children}
        </View>
    )
}