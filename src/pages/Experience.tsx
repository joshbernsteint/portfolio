import { Timeline, TimelineItem, TimelineDot, TimelineContent, TimelineSeparator, TimelineConnector, TimelineOppositeContent } from '@mui/lab';
import { useTrail, animated, config, useSprings, useSpring } from '@react-spring/web';
import { ReactElement } from 'react';
import { useScroll } from '../utils/Hooks';

import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SchoolIcon from '@mui/icons-material/School';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { duration, Typography } from '@mui/material';
import SectionLabel from '../components/SectionLabel';



type experience = {
    title: string, 
    company: string,
    location: string, 
    from: {month: string, year: string},
    to?: {month: string, year: string},
    current?: boolean,
    desc: (ReactElement | string)[],
    icon: ReactElement,
}

// This should be in order of most recent first
const myExperience : experience[] = [
    {
        title: "Student Assistant",
        company: "Stevens Institute of Technology",
        location: "Hoboken, NJ",
        from: {month: "October", year: "2023"},
        current: true,
        desc: [
            "Designed and Developed an interactive service dashboard in Node.js and React.js.",
            "Managed a dual-database system in MongoDB and GraphDB.",
            "Created interfaces between the dashboard and highly-complex existing scripts written in Python.",
            "Communicated with team members to incorporate additional dashboard contributions."
        ],
        icon: <DashboardCustomizeIcon fontSize='large'/>
    },
    {
        title: "Course Assistant",
        company: "Stevens Institute of Technology",
        location: "Hoboken, NJ",
        from: {month: "September", year: "2023"},
        current: true,
        desc: [
            "Aided students in understanding fundamentals of computer architecture and UNIX-based operating systems.",
            "Conducted weekly office hours to help students and answer any questions they have.",
            "Ran lab sessions to demonstrate examples and explain course material in greater detail than can be covered in a lecture.",
            "Graded students' homeworks, labs, and exams.",
        ],
        icon: <SchoolIcon fontSize='large'/>
    },
    {
        title: "Research Assistant",
        company: "Stevens Institute of Technology",
        location: "Hoboken, NJ",
        from: {month: "Summer", year: "2022/2023"},
        current: false,
        desc: [
            "Wrote scripts in Python to manage large amounts of image data. These handling tasks included downloading, converting, analyzing, and storing image data.",
            "Performed weekly presentations on my progress.",
            "Collaborated with other assistants to ensure everyone had proper knowledge of the codebase.",
            <span>Coauthor of <a href='https://ui.adsabs.harvard.edu/abs/2023LPICo2806.2937R/abstract' target='_blank'>this paper</a>.</span>,
        ],
        icon: <ImageSearchIcon fontSize='large'/>
    }
]

const AnimatedConnector = animated(({maxHeight}) => <TimelineConnector sx={{maxHeight, width: '5px', borderRadius: '5px'}}/>);
const AnimatedDot = animated(({opacity, color="error",children, ...props}) => <TimelineDot color={color} sx={{opacity, ...props}}>{children}</TimelineDot>);

export default function Experience({scrollRef} : any){
    const inView = useScroll(.7);

    
    const title = useSpring({
        config: {duration: 500, ...config.molasses},
        opacity: inView ? 1 : 0,
        x: inView ? 0 : 20,
    });

    const [trail] = useSprings(myExperience.length, i => ({
        config: {duration: 500},
        maxHeight: inView ? '100%' : '0%',
        opacity: inView ? 1 : 0,
        delay: (i+2)*250,
    }), [inView]);
    

    return (
        <div id='experience' className='sectionBlock' style={{textAlign: 'center'}} ref={scrollRef}>
                <animated.div style={{overflow: 'hidden', ...title}}>
                    <Typography variant='h1'>Experience</Typography>
                </animated.div>
                <Timeline position='right'>
                    {
                        myExperience.map((e,i) => (
                            <TimelineItem key={i} >
                                <TimelineOppositeContent>
                                    <animated.div style={{opacity: trail[i].opacity}}>
                                    <b style={{fontSize: '22pt'}}>{e.company}</b><br/>
                                    <span style={{fontSize: '18pt'}}>
                                    <i>
                                        {e.from.month} {e.from.year}{e.current ? (<> &mdash; Present</>) : (e.to && <> &mdash; {e.to.month} {e.to.year}</>)}
                                        <br/>{e.location}
                                    </i>
                                    </span>
                                    </animated.div>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                <AnimatedDot {...trail[i]}>
                                    {e.icon}
                                </AnimatedDot>
                                {i < (myExperience.length - 1) && <AnimatedConnector {...trail[i]}/>}
                                </TimelineSeparator>
                                <TimelineContent>
                                    <animated.div style={{opacity: trail[i].opacity}}>
                                        <span style={{fontSize: '24pt', fontWeight: 'bold'}}>{e.title}</span><br/>
                                        <ul style={{fontSize: '14pt'}}>
                                        {
                                            e.desc.map((e2, i2) => (
                                                <li key={i2}>{e2}</li>
                                            ))
                                        }
                                        </ul>
                                    </animated.div>
                                </TimelineContent>

                            </TimelineItem>
                        ))
                    }
                </Timeline>
        </div>
    );
};
