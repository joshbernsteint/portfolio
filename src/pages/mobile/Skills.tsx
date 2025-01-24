import MobileSectionTitle from "./SectionTitle.tsx";
import { spokes as skillList } from "../Skills.tsx";

export default function MobileSkills({scrollRef} : {scrollRef: any}){
    return (
        <div ref={scrollRef} id="skills">
            <br/>
            <MobileSectionTitle title="Skills"/>
            <div>
                {
                    skillList.map((s,i) => (
                        <div key={i} style={{padding: '1rem'}}>
                            <h3 style={{display: 'inline'}}>{s.title}</h3>
                            <p />
                            {
                                typeof s.element === "function" ? (
                                    s.element(i, true, true)
                                ) : s.element
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}