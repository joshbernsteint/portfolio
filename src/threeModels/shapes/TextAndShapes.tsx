import { fullRingArgs, shapeArgs, shapeMap, ShapeTypes } from "./Shapes";
import { AnimatedText, textArgs } from "../basic/Text";
import { a, useSprings } from "@react-spring/three";
import { useHover } from "../../utils/Hooks";
import { ThreeEvent } from "@react-three/fiber";

export type textShapeArgs = Partial<{
    text: textArgs[],
    shapes: {type: ShapeTypes, args: shapeArgs | fullRingArgs}[]
    position: [number, number, number],
    groupTextArgs: any,
    rotation?: [number, number, number],
    startPaused?: boolean,
    onClick: (e: ThreeEvent<MouseEvent>) => void,
}> & {
    [key: string] : any,
};

export default function TextAndShapes({
    text=[{content: "lorem ipsum", position: [0,0,0], textArgs: {depth: .1, size: 10}}],
    shapes=[{type: ShapeTypes.TRIANGLE, args: {}}],
    position=[0,0,0],
    rotation=[0,0,0],
    groupTextArgs={},
    onClick=undefined,
    startPaused=true,
    ...props
} : textShapeArgs){
    

    const [textSprings, textAPI] = useSprings(text.length, i => ({
        pause: startPaused,
        from: {targetOpacity: 0},
        to: {targetOpacity: 1},
        delay: text[i].delay || 0,
        config: { duration: text[i].duration || 1000}
    }));

    const hover = useHover(onClick ? "pointer" : "disabled");

    return (
        <a.group position={position} rotation={rotation} {...props} onClick={onClick} {...hover}>
            <a.group {...groupTextArgs}>
            {
                textSprings.map((e,i) => (
                    <AnimatedText
                        key={i}
                        {...text[i]}
                        {...e}
                    />
                ))
            }
            </a.group>
            {
                shapes.map((e,i) => {
                    const Shape = shapeMap[e.type];
                    return (
                        <Shape {...e.args} key={i} onRest={() => textAPI.start({pause: false})}/>
                    );
                })
            }
        </a.group>
    )
}