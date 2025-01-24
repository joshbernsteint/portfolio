import { animated } from "@react-spring/web";

const Chip = ({content, styles={}}: {content: string, styles?: React.CSSProperties}) => (
    <span style={{backgroundColor: '#303030', padding: '.05rem' ,borderRadius: '1px', margin: '.025rem', ...styles}}>{content}</span>
);


export const AnimatedChip = animated(({content="", opacity=1, styles={}} : {content: string, opacity?: number, styles?: React.CSSProperties}) => (
    <span style={{opacity: opacity}}>
        <Chip content={content} styles={styles}/>
    </span>
));
export default Chip;