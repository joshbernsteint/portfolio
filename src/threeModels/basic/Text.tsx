import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useMemo } from 'react';
import font from '../../assets/fonts/roboto/Roboto Black_Regular.json';
import { animated } from '@react-spring/three';

  

export type textArgs = Partial<{
    content: string,
    position: [number, number, number],
    rotation: [number, number, number],
    textArgs: {
        size: number,
        depth: number,
    },
    targetOpacity: number,
    customFont: Object | string,
    color: number|string,
    centered: boolean,
    duration: number,
    delay: number,
}>;


extend({TextGeometry});

function Text({
    content="Lorem Ipsum", 
    position=[0,0,0],
    rotation=[0,0,0],
    textArgs={size:5, depth: 1},
    targetOpacity=1, 
    customFont=font,
    color=0xffffff,
    centered=false,
    ...props
} : textArgs){

    const textGeo = useMemo(() => {
            const _obj = new TextGeometry(
                content, {font: new FontLoader().parse(customFont), ...textArgs}
            );
            if(centered){
                _obj.center();
            }

            return _obj;
        }, [customFont, content, centered]);

    return (
        <mesh
        position={position}
        rotation={rotation}
        geometry={textGeo}
        {...props}
         >
            <meshLambertMaterial attach='material' emissive={color} transparent opacity={targetOpacity}/>
        </mesh>
    );
}

export default Text;
export const AnimatedText = animated(Text);