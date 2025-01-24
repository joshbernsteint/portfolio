import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, useTheme } from "@mui/material";
import { myEducation, EducationRowProps, AnimatedCalendarIcon, getSVGFill, IconWithText } from "../Education.tsx";
import { useMemo } from "react";

import EventIcon from '@mui/icons-material/EventAvailable';
import GradeIcon from '@mui/icons-material/Grade';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MobileSectionTitle from "./SectionTitle.tsx";


function MobileEducationRow({level, where, date, gpa, id, courses, timeCalcs}: EducationRowProps){
    const theme = useTheme();  

    const DateIcon = useMemo(() => {
        const fill = getSVGFill(timeCalcs);
        return fill === 100 ? (<EventIcon fontSize="inherit" color="success" />) : (
            <AnimatedCalendarIcon svgFill={fill} fillColor={theme.palette.success.main} id={id}/>
        )
    }, [timeCalcs]);

    return (
        <div style={{maxWidth: '100%', overflowX: 'hidden'}} id="education">
            <h2 style={{display: 'inline'}}>{level}</h2>&mdash;
            <Button 
                color={where.color} 
                target="_blank" 
                href={where.link} 
                sx={{padding: '.25rem 0rem', fontStyle: 'italic'}}
            >
                {where.name}
            </Button><br/>
            <IconWithText text={date} icon={DateIcon} fontSize="10pt" iconSize="20pt" space={5}/> <p/>
            <IconWithText text={<>{gpa} GPA</>} icon={<GradeIcon fontSize="inherit"/>} fontSize="10pt" iconSize="20pt" space={5}/>
            <Accordion
                sx={{background: 'transparent', marginTop: '5px', overflowX: 'hidden'}}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{padding: 0}}
                >
                    <IconWithText text={<>Relevant Coursework</>} icon={<SchoolIcon fontSize="inherit"/>} fontSize="10pt" iconSize="20pt" space={5}/>
                </AccordionSummary>
                <AccordionDetails sx={{maxWidth: '100%'}}>
                    <div style={{overflowX: 'hidden'}}>
                    {
                        courses.map((c,i) => (
                            <Chip label={<IconWithText text={c.name} icon={c.icon} fontSize=".70rem" iconSize="1rem" space={2}/>} key={i} sx={{margin: '2px'}}/>
                        ))
                    }
                    </div>
                </AccordionDetails>
            </Accordion>

            <br/>
        </div>
    );
}

export default function MobileEducation({scrollRef} : {scrollRef: any}){
    return (
        <div ref={scrollRef}>
            <MobileSectionTitle title="Education"/>
            <div style={{padding: '1rem'}}>
                {
                    myEducation.map((e,i) => <MobileEducationRow key={i} {...e}/>)
                }
            </div>
        </div>
    );
}