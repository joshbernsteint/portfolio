import { fullRingArgs, shapeArgs, shapeMap, ShapeTypes } from "./Shapes";
import { AnimatedText, textArgs } from "../basic/Text";
import { a, useSprings } from "@react-spring/three";

export type textShapeArgs = Partial<{
    text: textArgs[],
    shapes: {type: ShapeTypes, args: shapeArgs | fullRingArgs}[]
    position: [number, number, number],
    groupTextArgs: any,
    onClick: () => void,
}> & {
    [key: string] : any,
};

export default function TextAndShapes({
    text=[{content: "lorem ipsum", position: [0,0,0], textArgs: {depth: .1, size: 10}}],
    shapes=[{type: ShapeTypes.TRIANGLE, args: {}}],
    position=[0,0,0],
    groupTextArgs={},
    onClick=undefined,
    ...props
} : textShapeArgs){

    const [textSprings, textAPI] = useSprings(text.length, i => ({
        pause: true,
        from: {targetOpacity: 0},
        to: {targetOpacity: 1},
        delay: text[i].delay || 0,
        config: { duration: text[i].duration || 1000}
    }));

    return (
        <a.group position={position} {...props}>
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
                        <Shape {...e.args} key={i} onRest={() => textAPI.start({pause: false})} onClick={onClick}/>
                    );
                })
            }


        </a.group>
    )
}