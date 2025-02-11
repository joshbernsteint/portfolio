import React, { useMemo } from 'react'
import { useTrail, animated } from '@react-spring/web'
import { styled } from '@stitches/react'

export enum Guess{
    PERFECT='#6cab64',
    EXISTS="#b59f3b",
    WRONG="#696969",
}

export type WordleLine = {l: string, g: Guess}[]


const SharedStyles : React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontWeight: 800,
  backfaceVisibility: 'hidden',
}

const FrontBox = styled(animated.div, {
  ...SharedStyles,
  backgroundColor: '#141414',
})

const BackBox = styled(animated.div, {
  ...SharedStyles,
  backgroundColor: Guess.WRONG,
  color: '#fafafa',
})

export type LetterColors = 'info' | 'w_null' | 'w_ex' | 'w_perf';
export type ColorMap = {[key: string]: LetterColors}


export function parseGuess(guess: string, correct: string, colorMap: ColorMap) : [correct: boolean, line: WordleLine, newColorMap: ColorMap] {
    const result : WordleLine = [];
    let won : boolean = true;
    correct = correct.toUpperCase();
    for (let i = 0; i < correct.length; i++) {
        const g = guess[i];
        const c = correct[i];
        
        if(g === c){
            result.push({l: g, g: Guess.PERFECT});
            colorMap[g] = 'w_perf';
        }
        else if(correct.includes(g)){
            result.push({l: g, g: Guess.EXISTS});
            won = false;
            if(colorMap[g] !== 'w_perf'){
                colorMap[g] = 'w_ex';
            }
        }
        else{
            result.push({l: g, g: Guess.WRONG});
            won = false;
            if(!colorMap[g]){
                colorMap[g] = 'w_null';
            }
        }
    }

    return [won, result, colorMap];
}

export type TextSize = 'xsmall' | 'small' | 'normal'
function getTextSizeTyle(size : TextSize) : {fontSize: string, height: number | string} {
    switch (size) {
        case 'xsmall':
            return {
                fontSize: '14pt',
                height: 50
            }
        case 'small':
            return {
                fontSize: '16pt',
                height: 60,
            }
        default:
            return {
                fontSize: '20pt',
                height: 75,
            }
    }
}

type LineProps = {
    currentInput?: string[],
    lastLine?: boolean,
    flip?: WordleLine,
    size?: number,
    onRest?(): void,
    textSize?: TextSize
};

export default function Line({lastLine=false, currentInput=[], flip=undefined, size=5, onRest, textSize='normal'}: LineProps) {
    const [trail] = useTrail(size, () => ({
        rotateX: flip ? -180 : 0,
        onRest: onRest,
    }), [flip])

    const textStyles = useMemo(() => getTextSizeTyle(textSize), [textSize]);

    return (
    <div style={{
        marginBottom: lastLine ? 0 : 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: textStyles.fontSize,
    }}>
        <div style={{display: 'flex', gap: 5}}>
        {trail.map(({ rotateX }, i) => (
            <div key={i} style={{
                position: 'relative',
                height: textStyles.height,
                aspectRatio: 1,
            }}>
                <FrontBox
                    style={{
                    transform: rotateX.to(val => `perspective(600px) rotateX(${val}deg)`),
                    transformStyle: 'preserve-3d',
                    backgroundColor: currentInput[i] && "#0d0d0d",
                    border: currentInput[i] && '1px solid #e6e2e2'
                    }}>
                    {currentInput[i] || ' '}
                </FrontBox>
                <BackBox
                    style={{
                    transform: rotateX.to(val => `perspective(600px) rotateX(${180 - val}deg)`),
                    transformStyle: 'preserve-3d',
                    backgroundColor: flip && flip[i].g,
                    }}>
                    {flip && flip[i].l}
                </BackBox>
            </div>
        ))}
        </div>
    </div>
    )
}

