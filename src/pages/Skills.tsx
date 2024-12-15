import DoublePaper from "../components/DoublePaper";
import SectionLabel from "../components/SectionLabel";
import SkillRating from "../components/SkillRating";


export default function Skills({scrollRef, ...props}: {scrollRef: any, [prop: string]: any}){

    return (
        <div id="skills" className="sectionBlock" ref={scrollRef} style={{marginTop: '2rem'}}>
            <DoublePaper>
                <SectionLabel label="Skills"/>
            </DoublePaper>            
        </div>
    );
}