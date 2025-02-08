import { AppBar, Button, ButtonGroup, Menu, Toolbar, Typography } from "@mui/material";
import { ReactNode, useMemo, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate, useLocation } from "react-router";


function NavbarButton({link, label, newTab=false, children=[]}: {link: string, label: string, newTab?: boolean, children?: ReactNode | ReactNode[] }){
    
    
    const hasChildren = useMemo<boolean>(() => {
        if(Array.isArray(children)){
            return children.length > 0;
        }
        return true;
    }, [children]);
    const [anchor, setAnchor] = useState<Element | null>(null);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    
    

    const linkProps = {
        href: newTab ? link : undefined,
        target: newTab ? "_blank": undefined,
        onClick: () => !newTab && navigate(link)
    }
    

    return (
        <span>
            {
                hasChildren ? (
                    <ButtonGroup sx={{border: 'none'}}>
                        <Button 
                            color="inherit" 
                            sx={{border: 'none', fontSize: 'inherit', textTransform: 'none', marginRight: 0, paddingRight: 1}}
                            {...linkProps}
                        >{label}</Button>
                        <Button 
                            color="inherit" 
                            sx={{border: 'none', p: 0, m: 0}} 
                            size="small"
                            onClick={(e) => setAnchor(e.currentTarget)}
                            ><ArrowDropDownIcon sx={{p: 0}}/></Button>
                    </ButtonGroup>
                ) : (
                    <Button
                        color="inherit" sx={{fontSize: 'inherit', textTransform: 'none'}}
                        {...linkProps}
                        >
                            {label}
                    </Button>
                )
            }
            <Menu
                sx={{zIndex: 25}}
                anchorEl={anchor}
                open={Boolean(anchor) && !(link !== pathname && pathname.includes(link))}
                onClose={() => setAnchor(null)}
            >
                <div style={{padding: 5}}>
                {
                    Array.isArray(children) ? (
                        children.map(e => <>{e}<br/></>)
                    ) : children
                }
                </div>
            </Menu>
        </span>
    );
}

const Spacer = () => <span style={{marginLeft: '1rem'}}></span>

export default function Navbar(){

    const navigate = useNavigate();

    return (
        <div style={{position: 'relative'}}>
            <AppBar position="sticky" sx={{zIndex: 20}} color="inherit">
                <Toolbar>
                    <img src="/me.svg" height={75} style={{padding: 10}}/>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" sx={{fontSize: 'inherit', textTransform: 'none', m: 1}} onClick={() => navigate('/')}>
                            Joshua Bernstein
                        </Button>
                    </Typography>
                    <span style={{fontSize: 'Larger'}}>
                        {/* <NavbarButton link="/games" label="Games">
                            <NavbarButton link="/games/wordle" label="Wordle"/>
                        </NavbarButton> */}
                        <NavbarButton link="/games/wordle" label="Wordle"/>
                        <Spacer />
                        {/* <NavbarButton link="/tools" label="Tools">
                            <NavbarButton link="/tools/requester" label="Requester" />
                        </NavbarButton> */}
                        <Spacer />
                        <NavbarButton link="/resume" label="Resume" newTab/>
                        <Spacer />
                        <NavbarButton link="https://www.linkedin.com/in/joshua-bernstein-9700261b0/" label="LinkedIn" newTab/>
                        <Spacer />
                        <NavbarButton link="https://github.com/joshbernsteint" label="GitHub" newTab/>

                    </span>
                </Toolbar>
            </AppBar>
        </div>
    );
}