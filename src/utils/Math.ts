import { degToRad } from "three/src/math/MathUtils.js";

export type point = [x: number,y: number];

function normalizePoint(pt: point, xRange: number, yRange: number) : point{
    
    const [xMin, xMax] = [-xRange, xRange];
    const [yMin, yMax] = [-yRange, yRange];
    let [x,y] = pt;
    x = (x - xMin) / (xMax - xMin);
    y = (y - yMin) / (yMax - yMin);
    
    return [x,y];
}

function unNormalizePoint(norm_pt: point, xRange: number, yRange: number) : point{    
    const [xMin, xMax] = [-xRange, xRange];
    const [yMin, yMax] = [-yRange, yRange];

    let [x,y] = norm_pt;
    x = (x * (xMax - xMin)) + xMin;
    y = (y * (yMax - yMin)) + yMin;
    
    return [x,y];
}


function rotateShape(points: point[], angle: number) : point[]{
    const toRad = degToRad(angle);
    const cos = Math.cos(toRad);
    const sin = Math.sin(toRad);
    return points.map(([x,y]) => ([
        (x * cos) - (y * sin),
        (y * cos) + (x * sin),
    ]));
}

function sumArray(arr: number[]){    
    return arr.reduce((prev, cur) => prev + cur, 0);
}

export {
    normalizePoint,
    unNormalizePoint,
    rotateShape,
    sumArray
};