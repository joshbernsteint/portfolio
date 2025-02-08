import React from 'react'
import { useTrail, animated } from '@react-spring/web'
import { styled } from '@stitches/react'

export enum Guess{
    PERFECT='#6cab64',
    EXISTS="#b59f3b",
    WRONG="#696969",
}

export type WordleLine = {l: string, g: Guess}[]



const AppContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20pt',
})

const Container = styled('div', {
  display: 'flex',
  gap: 5,
})

const Box = styled('div', {
  position: 'relative',
  height: 75,
  width: 75,
})

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

type LineProps = {
    currentInput?: string[],
    lastLine?: boolean,
    flip?: WordleLine,
    size?: number,
    onRest?(): void,
};

export default function Line({lastLine=false, currentInput=[], flip=undefined, size=5, onRest}: LineProps) {
    const [trail] = useTrail(size, () => ({
        rotateX: flip ? -180 : 0,
        onRest: onRest,
    }), [flip])


    return (
    <AppContainer style={{marginBottom: lastLine ? 0 : 5}}>
        <Container >
        {trail.map(({ rotateX }, i) => (
            <Box key={i}>
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
            </Box>
        ))}
        </Container>
    </AppContainer>
    )
}

