import { Typography } from "@mui/material";
import { animated } from "@react-spring/web";
import { ReactNode } from "react";

const AType = animated(({children, style={}, opacity=1} : {children: ReactNode, style?: React.CSSProperties, opacity?: number}) => (
    <Typography sx={{...style, opacity: opacity}}>
        {children}
    </Typography>
))

export default AType;