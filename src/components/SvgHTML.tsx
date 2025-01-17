import { ReactNode, CSSProperties } from "react";


type SvgHTMLProps = {
    center?: boolean,
    x: number | string,
    y: number | string,
    height?: number | string,
    width?: number | string,
    children?: ReactNode | ReactNode[],
    styles?: CSSProperties,
};

const centerObj = {transformBox: 'fill-box', transformOrigin: 'center', transform: 'translateX(-50%) translateY(-50%)'};

export default function SvgHTML({
    x,
    y,
    center = false,
    height = 100,
    width = 100,
    styles = {background: 'transparent'},
    children,
} : SvgHTMLProps){
    return (
        <foreignObject x={x} y={y} height={height} width={width}
            style={center ? {...centerObj, ...(styles as any)} : styles}
        >
            {children}
        </foreignObject>
    );
}