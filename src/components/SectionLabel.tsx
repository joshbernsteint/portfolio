import { Typography } from "@mui/material";

export default function SectionLabel({label="Lorem Ipsum", fontSize="60pt", ...props}: {label?: string, fontSize?: string, [prop: string]: any}){
    return (
        <Typography variant="h1" sx={{fontWeight: "400", fontSize, ...props}}>
            {label}
        </Typography>
    );
}