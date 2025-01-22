import { Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { animated } from "@react-spring/web";
import { ReactNode } from "react";

const AType = animated(({children, style={}, opacity=1, variant="body1"} : {children: ReactNode, style?: React.CSSProperties, opacity?: number, variant?: Variant}) => (
    <Typography sx={{opacity: opacity, ...style}} variant={variant}>
        {children}
    </Typography>
))

export default AType;