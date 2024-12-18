import { useSpring } from "@react-spring/three";

const TWO_PI = 2*Math.PI;

type useRotateOptions = {
    clockwise?: boolean,
    startPaused?: boolean,
    startRotation?: [number,number,number]
}

export function useRotate(period: number, options: useRotateOptions = {}) : {rotate: [any,any], counter: [any,any]}{
    const {clockwise=false, startPaused=false, startRotation=[0,0,0]} = options;

    const rotateSpring = useSpring(() => ({
        from: {rotation: startRotation},
        to: {rotation: [0,0, clockwise ? -TWO_PI: TWO_PI]},
        config: {duration: period * 1000},
        loop: true,
        pause: startPaused
    }), [period]);

    const counterSpring = useSpring(() => ({
        from: {rotation: [-startRotation[0], -startRotation[1], -startRotation[2]]},
        to: {rotation: [0,0, clockwise ? TWO_PI: -TWO_PI]},
        config: {duration: period * 1000},
        loop: true,
        pause: startPaused
    }), [period]);


    return {rotate: rotateSpring, counter: counterSpring};
}