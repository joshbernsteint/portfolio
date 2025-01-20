import { animated } from "@react-spring/three";

const AnimatedLine = animated((props: React.SVGLineElementAttributes<SVGLineElement>) => <line stroke="white" strokeLinecap="round" {...props} />);

export default AnimatedLine;