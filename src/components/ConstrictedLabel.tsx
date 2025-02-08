import { useMemo } from "react";

export default function ConstrictedLabel({label, maxWidth=15} : {label: string, maxWidth?: number}){
    const display = useMemo(() => {
        if(label.length > maxWidth){
            return `${label.substring(0, maxWidth)}...`;
        }
        else return label;
    }, [label]); 

    return <span>{display}</span>
}