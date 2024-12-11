import { Paper } from "@mui/material";


export default function DoublePaper({baseElevation=2, upperElevation=(baseElevation+1), children, ...props}: any){
    return (
        <Paper elevation={baseElevation} sx={{padding: '1rem', borderRadius: '10px'}} {...props}>
            <Paper elevation={upperElevation} sx={{padding: '1.5rem'}}>
                {children}
            </Paper>
        </Paper>
    );
}