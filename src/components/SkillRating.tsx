import { ButtonGroup, Button } from "@mui/material";
import { useMemo } from "react";

type SkillRatingProps = {
    value?: number,
    max?: number,
    fillColor?: string,
};

const linearGradient = (percentage: number, fillColor: string) => `linear-gradient(to right, ${fillColor} ${percentage}%, transparent ${percentage}%)`;

function getFillPercentage(pillIndex: number, value: number): number{
    if(pillIndex <= value)
        return 100;
    else if(pillIndex > Math.ceil(value))
        return 0;
    else
        return 0;
}

export default function SkillRating({
    value=0,
    max=0,
    fillColor="blue",
}: SkillRatingProps){

    const numPills: number[] = useMemo(() => new Array(max).fill(0), [max]);

    return (
        <ButtonGroup variant="outlined">
            {
                numPills.map((_,i) => (
                    <Button key={i} sx={{background: linearGradient(getFillPercentage(i+1, value),fillColor)}} style={{border: '2px solid #15181a'}} disabled>
                        &nbsp;
                    </Button>
                ))
            }
        </ButtonGroup>
    )
}