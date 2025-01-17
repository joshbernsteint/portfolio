import { degToRad, randInt } from "three/src/math/MathUtils.js";

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

function randomArrayItem(arr: any[]){
    if(arr.length === 0)
        return undefined;

    return arr[randInt(0, arr.length - 1)];
}

function round(num: number, places: number = 2): number{
    const multiplier = Math.pow(10, places);
    return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
}

export type Point2D = [x: number, y:number];
export type PointList = Point2D[];

const HALF_PI : number = Math.PI / 2;
export function generateCirclePoints(radius: number, numPoints: number, startingAngle : number = HALF_PI, origin: Point2D = [0,0]) : [PointList, rotations: number[]]{
    const angleBetweenPoints : number = (2 * Math.PI) / numPoints;
    const result : PointList = [];
    const rots : number[] = [];

    let currentAngle : number = startingAngle;
    for (let i = 0; i < numPoints; i++) {
        result.push([origin[0] + radius * Math.cos(currentAngle), origin[1] + radius*Math.sin(currentAngle)]);
        rots.push(currentAngle);
        currentAngle += angleBetweenPoints;
    }
    
    return [result, rots];
}

export {
    normalizePoint,
    unNormalizePoint,
    rotateShape,
    sumArray,
    randomArrayItem,
    round
};