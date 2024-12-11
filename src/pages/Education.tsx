import { Button, Grid2 as Grid, Step, StepButton, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import DoublePaper from "../components/DoublePaper";
import Image from "../components/Image";

import mahwahHS from '../assets/images/education/mahwah.jpg';

const steps = ["Master's Degree", "Bachelor's Degree", "High School"];

type EducationGridProps = {
    level: string,
    school: string,
    schoolUrl: string,
    schoolColor?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning",
    startDate: string,
    endDate: string,
    gpa: number,
    inProgress?: boolean
    relevantCourses?: string[],
}

function EducationGrid(props: EducationGridProps){
    const {
        level, 
        school,
        schoolUrl,
        startDate, 
        endDate, 
        gpa, 
        schoolColor="primary",
        inProgress=false, 
        relevantCourses=[],
    } = props;
    
    return (
        <Grid size={3.5} textAlign={'center'}>
            <Typography variant="h3">
                {level}
            </Typography>
            <Typography variant="h6" fontStyle={"italic"}>
                <Button target="_blank" href={schoolUrl} color={schoolColor}>{school}</Button>
            </Typography>
        </Grid>
    );
}

const Seperator = () => <Grid size={0.5} sx={{borderLeft: '1px solid white', height: '500px'}}/>


export default function Education({scrollRef, ...props}: any){

    const [activeStep, setActiveStep] = useState<number>(0);


    return (
        <div style={{backgroundColor: '#15181a', padding: '2rem'}} ref={scrollRef}>
            <DoublePaper>
            <Typography variant="h1">
                Education
            </Typography><br/>
            <Grid container spacing={2}>
                <EducationGrid 
                    level="High School"
                    school="Mahwah High School"
                    startDate="September 2017"
                    endDate="June 2021"
                    schoolUrl="https://hs.mahwah.k12.nj.us/"
                    schoolColor="info"
                    gpa={4.0}
                    relevantCourses={[
                        "AP Computer Science A", "AP Computer Science Principles", "Data Structures"
                    ]}
                />
                <Seperator />
                <EducationGrid 
                    level="Bachelor's Degree"
                    school="Stevens Institute of Technology"
                    startDate="September 2021"
                    endDate="May 2024"
                    gpa={3.96}
                    schoolUrl="https://www.stevens.edu/"
                    schoolColor="error"
                    relevantCourses={[
                        "Algorithms", "Computer Organization & Systems", "Systems Programming", "Web Development 1 & 2", "Database Management Systems 1 & 2", "Concurrent Programming", "Operating Systems"
                    ]}
                />
                <Seperator />
                <EducationGrid 
                    level="Master's Degree"
                    school="Stevens Institute of Technology"
                    startDate="September 2024"
                    endDate="May 2025"
                    inProgress
                    gpa={4.0}
                    schoolUrl="https://www.stevens.edu/"
                    schoolColor="error"
                    relevantCourses={[
                        "Quantum Information and Quantum Computation", "Agile Methodology", "Data Mining", "Enterprise and Cloud Computing", "Computer Vision"
                    ]}
                />
            </Grid>
            </DoublePaper>
        </div>
    );
}