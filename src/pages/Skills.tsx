import SectionLabel from "../components/SectionLabel";
import SkillRating from "../components/SkillRating";


export default function Skills({scrollRef, ...props}: {scrollRef: any, [prop: string]: any}){

    return (
        <div id="skills" className="sectionBlock" ref={scrollRef}>
            <SectionLabel label="Skills"/>
            <SkillRating max={5} value={4.2} fillColor="lime"/>
        </div>
    );
}