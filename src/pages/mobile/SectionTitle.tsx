import { Typography } from "@mui/material";

export default function MobileSectionTitle({title="", fontSize='4rem'} : {title: string, fontSize?: string}){
    return <Typography variant="h1" fontSize={fontSize} textAlign={'center'}>{title}</Typography>
}