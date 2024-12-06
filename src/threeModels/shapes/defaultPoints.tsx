export type pointList = [number, number][];

export const OctagonPoints : pointList = [
    [ 0.414, 1.000],
    [ 1.000, 0.414],
    [ 1.000, -0.414],
    [ 0.414, -1.000],
    [-0.414, -1.000],
    [-1.000, -0.414],
    [-1.000, 0.414],
    [-0.414, 1.000],
    [ 0.414, 1.000],
];

export const HexagonPoints : pointList = [
    [1, 0],  
    [ 0.5, 0.8660254037844386 ],
    [-0.5, 0.8660254037844386 ],
    [-1, 0],
    [-0.5, -0.8660254037844386 ],
    [ 0.5, -0.8660254037844386 ],
    [1, 0],  
];

export const SquarePoints : pointList = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
    [-1, -1],
];

export const TrianglePoints : pointList = [
    [-.5, -0.288675134595],
    [.5, -0.288675134595],
    [0, 0.577350269189],
    [-.5, -0.288675134595],
];

export const DodecagonPoints : pointList = [
    [1,0],
    [0.8660254037844387,0.49999999999999994],
    [0.5000000000000001,0.8660254037844386],
    [6.123233995736766e-17,1],
    [-0.4999999999999998,0.8660254037844387],
    [-0.8660254037844387,0.49999999999999994],
    [-1,1.2246467991473532e-16],
    [-0.8660254037844388,-0.4999999999999997],
    [-0.5000000000000004,-0.8660254037844385],
    [-1.8369701987210297e-16,-1],
    [0.5000000000000001,-0.8660254037844386],
    [0.8660254037844384, -0.5000000000000004],
    [1,0],
];

