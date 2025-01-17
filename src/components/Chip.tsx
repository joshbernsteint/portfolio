import { animated } from "@react-spring/web";

const Chip = ({content}: {content: string}) => (
    <span style={{backgroundColor: '#303030', padding: '.05rem' ,borderRadius: '1px', margin: '.025rem'}}>{content}</span>
);


export const AnimatedChip = animated(({content="", opacity=1} : {content: string, opacity?: number}) => (
    <span style={{opacity: opacity}}>
        <Chip content={content}/>
    </span>
));
export default Chip;