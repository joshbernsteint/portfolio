
export type imageProps = {
    src: string,
    alt: string,
    center?: boolean,
    width?: number | string,
    height?: number | string,
    style?: React.CSSProperties,
    onMount?: (height: number, width: number) => void,
    onResetSize?: (minHeight: number) => void,
    [prop: string]: any,
}

const centerProps = {display: 'block', margin: 'auto'};

export default function Image(props: imageProps){
    const {
        src,
        alt,
        center=false,
        width="100%",
        height="100%",
        style={},
    } = props;

    return (
        <div style={{
            width: "100%",
            height: "100%",
        }}>
            <img src={src} alt={alt} style={{width: width, height: height, ...style, ...(center ? centerProps : {})}}/>
        </div>
    );
}