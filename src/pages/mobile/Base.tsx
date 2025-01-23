import About from "../About.tsx";


export default function MobileBase({}){
    return (
        <div style={{width: '100%', height: '100%'}}>
            <About useSmall/>
        </div>
    );
}