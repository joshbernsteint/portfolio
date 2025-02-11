import { Button, Tooltip } from "@mui/material";
import React, { ReactNode } from "react";


type OutlinedFabProps = {
    icon: ReactNode,
    color: string,
    tooltip?: string,
    onClick(e: React.MouseEvent<HTMLButtonElement>): void
};




export default function OutlinedFab({icon, color, onClick, tooltip=undefined} : OutlinedFabProps){
    const show = Boolean(tooltip);

    return (
    <Tooltip title={show && <span style={{fontSize: 'larger'}}>{tooltip}</span>} arrow hidden={!show}>
        <Button 
            color={color as any}
            variant="outlined"
            sx={{aspectRatio: 1, minWidth: 'min-content', maxWidth: 'min-content', borderRadius: '50%'}}
            onClick={onClick}
            >
            {icon}
        </Button>
    </Tooltip>
    )
};
