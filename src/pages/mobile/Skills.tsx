import MobileSectionTitle from "./SectionTitle.tsx";

export default function MobileSkills({scrollRef} : {scrollRef: any}){
    return (
        <div ref={scrollRef}>
            <MobileSectionTitle title="Skills"/>
        </div>
    );
}