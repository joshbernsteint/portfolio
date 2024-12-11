import { Grid2 as Grid, Grid2Props } from "@mui/material";
import { useMemo } from "react";
import { sumArray } from "../utils/Math";

type GridLayoutProps = {
    children: any[],
    sizeMap?: number[],
    spacing?: number,
    otherProps?: Grid2Props
};

export default function GridLayout({children, sizeMap=undefined, spacing=0, otherProps={},...props}: GridLayoutProps){

    const gridSizes = useMemo<number[]>(() => {
        const childrenLength = children.length;
        if(sizeMap){
            if(sizeMap.length >= childrenLength)
                return sizeMap;
            else if(sizeMap.length === (childrenLength - 1)){
                return [...sizeMap, 12 - sumArray(sizeMap)];
            }

            throw new Error("sizeMap must be equivalent or one less than the number of children.");
        }
        
        return new Array(childrenLength).fill(1/childrenLength);
    }, [children, sizeMap]);

    return (
        <Grid container spacing={spacing} {...otherProps}>
            {
                children.map((child: any, i:number) => (
                    <Grid key={i} size={gridSizes[i]}>
                        {child}
                    </Grid>
                ))
            }
        </Grid>
    );
}