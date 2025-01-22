import { Button } from "@mui/material";
import { ReactNode } from "react";

const LinkButton = ({link, children} : {link: string, children: string | ReactNode}) => <Button href={link} target="_blank" sx={{textTransform: 'none', padding: '0rem', fontSize: 'inherit', margin: 0, minWidth: 'auto'}}>{children}</Button>

export default LinkButton;