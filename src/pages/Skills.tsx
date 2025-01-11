import { useVisible } from "../utils/Hooks";


export default function Skills({scrollRef}: {scrollRef: any, [prop: string]: any}){


    const [inView, visRef] = useVisible(true);

    return (
        <div id="skills" className="sectionBlock" ref={scrollRef} style={{marginTop: '2rem'}}>
            <div ref={visRef}>
                {inView ? 'yo' : 'nah'}
            </div>
        </div>
    );
}