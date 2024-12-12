import { Typography } from "@mui/material";

export default function SectionLabel({label="Lorem Ipsum", ...props}: {label?: string, [prop: string]: any}){
    return (
        <Typography variant="h1" sx={{fontWeight: "400"}}>
            {label}
        </Typography>
    );
}