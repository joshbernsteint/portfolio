import { Button } from "@mui/material";
import { ReactNode } from "react";

const LinkButton = ({link, children} : {link: string, children: string | ReactNode}) => <Button href={link} target="_blank" sx={{textTransform: 'none', padding: '.1rem', fontSize: 'inherit', margin: 0}}>{children}</Button>

export default LinkButton;