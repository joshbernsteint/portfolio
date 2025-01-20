import { animated } from "@react-spring/web";
import { ReactNode } from "react";

const AnimatedDiv = animated(({children, props, opacity=1} : {children?: ReactNode, props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, opacity?: number}) => <div {...props} style={{...props?.style, opacity: opacity}}>{children}</div>);

export default AnimatedDiv;