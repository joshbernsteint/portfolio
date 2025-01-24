import MobileSectionTitle from "./SectionTitle.tsx";

export default function MobileProjects({scrollRef}: {scrollRef: any}){
    return (
        <div id="projects" ref={scrollRef}>
            <MobileSectionTitle title="Projects"/>
        </div>
    );
}