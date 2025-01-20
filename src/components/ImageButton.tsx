import { Button, ButtonOwnProps } from "@mui/material";
import { ReactNode } from "react";

type ImageProps = {
    backgroundColor: string,
    backgroundSize: string,
    backgroundBlendMode: string,
    backgroundPosition: string,
};

export type ImageButtonProps = {
    image: string,
    textColor?: string,
    children?: string | ReactNode,
    visible?: boolean,
    imageProps?: Partial<ImageProps>,
    otherProps?: ButtonOwnProps & React.ButtonHTMLAttributes<HTMLButtonElement>,
};

const defaultImageProps : ImageProps = {
    backgroundColor: "rgba(255,255,255,0.15)",
    backgroundBlendMode: 'lighten',
    backgroundSize: 'cover',
    backgroundPosition: 'default',
}

export default function ImageButton(
    {image, textColor="white", children="", imageProps=defaultImageProps, otherProps={}, visible=true,
} : ImageButtonProps){

    return (
        <Button
            variant="contained"
            sx={{
                fontSize: '20pt',
                color: textColor,
                width: '100%',
                minHeight: '10vh',
                textTransform: 'none',
                margin: '.5rem 0rem',
                backgroundImage: image,
                display: visible ? 'default' : 'none',
                ...defaultImageProps,
                ...imageProps,
            }}
            {...otherProps}
        >
            {children}
        </Button>
    )
}