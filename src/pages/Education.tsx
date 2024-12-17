import { Button, Chip, Divider, Grid2 as Grid, List, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DoublePaper from "../components/DoublePaper";
import Image from "../components/Image";
import stevensPNG from '../assets/images/education/stevens.png';
import mahwahPNG from '../assets/images/education/mahwah.png';
import GradeIcon from '@mui/icons-material/Grade';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/EventAvailable';
import SchoolIcon from '@mui/icons-material/School';
import SectionLabel from "../components/SectionLabel";

type EducationGridProps = {
    level: string,
    school: string,
    schoolUrl: string,
    schoolIcon: {
        src: string,
        alt: string,
    },
    schoolColor?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning",
    startDate: string,
    endDate: string,
    gpa: string,
    inProgress?: boolean
    iconHeight?: number,
    relevantCourses?: string[],
    onMountImage?: (height: number, width: number) => void,
}

function EducationGrid(props: EducationGridProps){
    const {
        level, 
        school,
        schoolUrl,
        schoolIcon,
        startDate, 
        endDate, 
        gpa, 
        schoolColor="primary",
        inProgress=false, 
        relevantCourses=[],
        iconHeight=280,
        onMountImage,
    } = props;
    
    return (
        <Grid size={3.5} textAlign={'center'}>
            <Typography variant="h3">
                {level}
            </Typography>
            <Typography variant="h6" fontStyle={"italic"}>
                <Button target="_blank" href={schoolUrl} color={schoolColor}>{school}</Button>
                <div style={{height: iconHeight}}>
                    <Image {...schoolIcon} width={"50%"} height={"100%"} style={{objectFit: 'contain'}} center/>
                </div>
                <br/>
                <List sx={{textAlign: 'left'}}>

                    {/* Start and End */}
                    <ListItemIcon sx={{fontSize: "14pt"}}>
                        <span style={{fontSize: "20pt"}}>
                            {
                                inProgress ? (
                                    <CalendarMonthIcon fontSize="inherit"/>
                                ) : (
                                    <EventIcon fontSize="inherit" color="success"/>
                                )
                            }
                        </span>
                        <ListItemText style={{fontStyle: "normal", marginLeft: '.5rem'}}>
                            {startDate} &mdash; {endDate}
                        </ListItemText>
                    </ListItemIcon> <br/>

                    {/* GPA */}
                    <ListItemIcon sx={{fontSize: "14pt"}}>
                        <span style={{fontSize: "20pt"}}>
                            <GradeIcon color="warning" fontSize="inherit"/>
                        </span>
                        <ListItemText style={{fontStyle: "normal", marginLeft: '.5rem'}}>
                            GPA: <Chip label={gpa} variant="outlined" sx={{marginLeft: '.5rem'}}/>
                        </ListItemText>
                    </ListItemIcon><br/>

                    {/* Relevant Coursework */}
                    <ListItemIcon sx={{fontSize: "14pt"}}>
                        <span style={{fontSize: "20pt"}}>
                            <SchoolIcon fontSize="inherit"/>
                        </span>
                        
                        <ListItemText style={{fontStyle: "normal", marginLeft: '.5rem'}}>
                            Relevant Coursework:
                        </ListItemText><br/>
                    </ListItemIcon>
                    <Divider />
                    <div style={{marginTop: ".75rem"}}>
                    {
                            relevantCourses.map((e,i) => (
                                <Chip key={i} label={e} sx={{margin: '.15rem'}}/>
                            ))
                        }
                    </div>

                </List>
            </Typography>
        </Grid>
    );
}

const Seperator = () => <Grid size={0.5} sx={{borderLeft: '1px solid white', minHeight: '100%', width: '0px'}}/>


export default function Education({scrollRef, style={}, ...props}: {[p: string]: any, style?: React.CSSProperties}){

    return (
        <div className="sectionBlock" ref={scrollRef} id="education" style={style}>
            <DoublePaper>
            <SectionLabel label="Education"/>
            <br/>
            <Grid container spacing={2} sx={{justifyContent: 'center', justifyItems: 'center'}}>
                <EducationGrid 
                    level="High School"
                    school="Mahwah High School"
                    startDate="September 2017"
                    endDate="June 2021"
                    schoolUrl="https://hs.mahwah.k12.nj.us/"
                    schoolColor="info"
                    schoolIcon={{
                        src: mahwahPNG,
                        alt: "Mahwah HS Logo",
                    }}
                    gpa="4.0"
                    relevantCourses={[
                        "AP Computer Science A", 
                        "AP Computer Science Principles", 
                        "Data Structures"
                    ]}
                />
                <Seperator />
                <EducationGrid 
                    level="Bachelor's Degree"
                    school="Stevens Institute of Technology"
                    startDate="September 2021"
                    endDate="May 2024"
                    gpa={"3.96"}
                    schoolUrl="https://www.stevens.edu/"
                    schoolColor="error"
                    schoolIcon={{
                        src: stevensPNG,
                        alt: "Stevens Institute of Technology Logo"
                    }}
                    relevantCourses={[
                        "Algorithms", "Computer Organization & Systems", 
                        "Systems Programming", 
                        "Web Development 1 & 2", 
                        "Database Management Systems 1 & 2", 
                        "Concurrent Programming", 
                        "Operating Systems",
                        "Human-Computer Interaction"
                    ]}
                />
                <Seperator />
                <EducationGrid 
                    level="Master's Degree"
                    school="Stevens Institute of Technology"
                    startDate="September 2024"
                    endDate="May 2025"
                    inProgress
                    gpa={"4.0"}
                    schoolUrl="https://www.stevens.edu/"
                    schoolColor="error"
                    schoolIcon={{
                        src: stevensPNG,
                        alt: "Stevens Institute of Technology Logo"
                    }}
                    relevantCourses={[
                        "Quantum Information and Quantum Computation", 
                        "Agile Methodology", 
                        "Data Mining", 
                        "Enterprise and Cloud Computing", 
                        "Computer Vision",
                    ]}
                />
            </Grid>
            </DoublePaper>
        </div>
    );
}