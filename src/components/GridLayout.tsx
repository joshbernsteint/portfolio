import { Grid2 as Grid, Grid2Props } from "@mui/material";
import { useMemo } from "react";
import { sumArray } from "../utils/Math";

type GridLayoutProps = {
    children: any[],
    sizeMap?: number[] | number,
    spacing?: number,
    otherProps?: Grid2Props
};

export default function GridLayout({children, sizeMap=undefined, spacing=0, otherProps={}}: GridLayoutProps){

    const gridSizes = useMemo<number[]>(() => {
        const childrenLength = children.length;
        let res : number[];
        if(sizeMap){
            if(!Array.isArray(sizeMap)){
                res = new Array(childrenLength).fill(sizeMap);
            }
            else if(sizeMap.length >= childrenLength)
                res = sizeMap;
            else if(sizeMap.length === (childrenLength - 1)){
                res = [...sizeMap, 1 - sumArray(sizeMap)];
            }
            else{
                throw new Error("sizeMap must be equivalent or one less than the number of children.");
            }
        }
        else{
            res = new Array(childrenLength).fill(1/childrenLength);
        }
        
        // Convert to range from 0 -> 12
        res = res.map(n => n * 12);
        return res;
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