import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useMemo } from 'react';
import font from '../../assets/fonts/roboto/Roboto_Regular.json';
import { animated } from '@react-spring/three';
import wrap from 'word-wrap';
import { Box3 } from 'three';

  

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
    charactersPerLine?: number,
    lineSpacing?: number,
}>;


extend({TextGeometry});

function Text({
    content="Lorem Ipsum", 
    position=[0,0,0],
    rotation=[0,0,0],
    textArgs={size:5, depth: 1},
    targetOpacity=1,
    lineSpacing=1,
    customFont=font,
    color=0xffffff,
    centered=false,
    charactersPerLine=-1,
    ...props
} : textArgs){

    const [textGeos, positions] = useMemo(() => {
            const font =  new FontLoader().parse(customFont);
            const lines = [];
            if(charactersPerLine !== -1){
                lines.push(...wrap(content, {width: charactersPerLine, indent: ''}).split('\n'));
            }
            else
                lines.push(content);
            
            const result: TextGeometry[] = [];
            
            const positions: [x: number, y: number, z: number][] = [];
            const heights : number[] = [];

            for(let i = 0; i < lines.length; i++){
                const g = new TextGeometry(
                    lines[i], {font, ...textArgs}
                );
                g.computeBoundingBox();
                if(centered){
                    g.center();
                }
                result.push(g);
                heights.push((g.boundingBox as Box3).max.y - (g.boundingBox as Box3).min.y);
            }

            const totalHeight = heights.reduce((prev, h) => prev + h + lineSpacing, -lineSpacing);
            const offset = totalHeight / 2;
            let currentPosition = offset;
            heights.forEach(h => {
                currentPosition -= (h/2);
                positions.push([0, currentPosition, 0]);
                currentPosition -= h / 2 + lineSpacing;
            });


            return [result, positions];
    }, [customFont, content, centered]);

    return (
        <group position={position} rotation={rotation} {...props}>
            {
                textGeos.map((g,i) => (
                    <mesh key={i} geometry={g} position={positions[i]}>
                        <meshLambertMaterial attach='material' emissive={color} transparent opacity={targetOpacity}/>
                    </mesh>
                ))
            }
        </group>
    );
}

export default Text;
export const AnimatedText = animated(Text);