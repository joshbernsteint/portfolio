import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import axios from 'axios';
import { Canvas } from "@react-three/fiber";
import Line, { ColorMap, LetterColors, parseGuess, TextSize, WordleLine } from "./Line.tsx";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { Timer } from "../../../utils/RequesterUtils.ts";
import { LocalStorage } from "../../../utils/Storage.ts";
import { useNavigate } from "react-router";
import { useWindow } from "../../../utils/Hooks.tsx";


async function checkWord(word: string): Promise<boolean> {
    try {
        await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return true;
    } catch (error: any) {
        return false;
    }
}

async function getWord(length: number) : Promise<string> {
    let isValidWord : boolean = false;
    let word : string;
    do {
        const response = await axios.get('https://random-word-api.herokuapp.com/word?length='+length);    
        word = response.data[0];
        isValidWord = await checkWord(word);
    } while (!isValidWord);
    return word;
}



function Letter({l, add, proxyKey=undefined, color="info", small=false}: {
        l: string | ReactNode, 
        add(k: string): void, proxyKey?: string, color?: LetterColors,
        small?: boolean,
    }){

    const width = small ? 5 : 10;

    return (
        <Button 
            color={color as any} variant={"contained"} 
            onClick={() => add(proxyKey || l as string)} 
            style={{maxWidth: width, minWidth: small ? 5 : undefined, maxHeight: small ? 25 : 50, fontSize: small ? '10pt' : '14pt', color: 'white'}}
        >
            {l}
        </Button>
    )
};

type GameStats = {
    streak: number,
    history: {
        w: number,
        t: number,
        i: number,
    }[]
};

type CurrentStats = {
    streak: number,
    time: string,
    tries: number,
};

export type GameState = {
    word: string,
    length: number,
    tries: number,
    maxTries: number,
    guessHistory: string[][],
    history: WordleLine[],
    colorMap: ColorMap,
    won?: boolean,
};

const storageKey : string = "wordle_stats";
const defaultState : GameState = {word: "", length: 5, tries: 0, maxTries: 6, history: [], guessHistory: [], colorMap: {}};

function Content(){
    const [game, setGame] = useState<GameState>({...defaultState});
    const [gameOver, setGameOver] = useState<boolean>(false);
    const navigate = useNavigate();
    const timerRef = useRef<Timer>(new Timer());
    const gameRef = useRef<boolean>(false);
    const triesArray = useMemo<number[]>(() => new Array(game?.maxTries || 6).fill(0), [game]);
    const [currentGuess, setCurrentGuess] = useState<string[]>([]);
    const [gameStats, setStats] = useState<CurrentStats>({streak: 0, time: "", tries: 0});
    const {width} = useWindow();
    const [smallLetters, lineSize] = useMemo<[small: boolean, lineSize: TextSize]>(() => {
        const small = width < 730;
        const extraSmall = width < 400;
        return [small, extraSmall ? 'xsmall' : (small ? 'small' : 'normal')];
    }, [width]);


    async function appendToGuess(key: string): Promise<boolean> {
        if(game){
            if((game.word.length > currentGuess.length) && /^[a-zA-Zaaa]$/m.test(key)){
                setCurrentGuess(g => [...g, key.toUpperCase()]);
                return true;
            }
            else if(key === "Backspace"){
                setCurrentGuess(g => [...g.slice(0, -1)]);
            }
            else if(key === "Enter"){
                // Check word
                const joined : string = currentGuess.join('');
                if((joined.length === game.length) && await checkWord(joined)){
                    const [won, line, newColorMap] = parseGuess(joined, game.word, game.colorMap);
                    setGame(cg => ({
                            ...cg,
                            tries: cg.tries + 1, 
                            history: [...cg.history, line],
                            guessHistory: [...cg.guessHistory, currentGuess],
                            colorMap: newColorMap,
                            won: won,
                        }));
                    setCurrentGuess([]);
                }
            }
        }
        return false;
    }

    async function startGame(wordLength: number = game.length, maxTries: number = game.maxTries){
        const newWord = await getWord(wordLength);
        setGame({
            word: newWord,
            length: wordLength,
            tries: 0,
            guessHistory: [],
            colorMap: {},
            won: false,
            maxTries: maxTries,
            history: [],
        });
        setCurrentGuess([]);
        setGameOver(false);
        gameRef.current = false;
        timerRef.current.start();
    }

    async function handleGameStart(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const wordLength = Number((target[0] as HTMLInputElement).value);
        const maxTries = Number((target[2] as HTMLInputElement).value);
        await startGame(wordLength, maxTries);
    }

    function resetGame(){
        setGame({...defaultState});
        gameRef.current = false;
        setCurrentGuess([]);
        setTimeout(() => {
            setGameOver(false);
        }, 100);
    }

    useEffect(() => {
        function keystrokeHandler(event: KeyboardEvent){
            appendToGuess(event.key);
        }
        document.addEventListener('keydown', keystrokeHandler);
        return () => document.removeEventListener('keydown', keystrokeHandler);
    }, [currentGuess, game]);

    useEffect(() => {
        if(gameOver){
            timerRef.current.end();
            const newStats = LocalStorage.get<GameStats>(storageKey) || {streak: 0, history: []};
            newStats.streak = (game.won ? newStats.streak + 1 : 0);
            newStats.history.push({w: Number(game.won || false), t: game.tries, i: timerRef.current.delta});
            LocalStorage.set(storageKey, newStats);
            setStats({streak: newStats.streak, time: Timer.deltaString(timerRef.current.delta), tries: game.tries});
            timerRef.current.clear();
        }
    }, [gameOver]);

    

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflowX: 'scroll'}}>
            <div style={{backgroundColor: "#23282b", padding: '1rem', width: 'min-content', borderRadius: '5px'}}>
                {
                    triesArray.map((_,i) => (
                        <Line 
                            key={i} 
                            size={game?.length}
                            currentInput={game.tries== i ? currentGuess : (game.tries > i) ? game.guessHistory[i] : undefined}
                            flip={(game?.tries || 0) > i ? game?.history[i] : undefined}
                            lastLine={(i+1) === game.maxTries}
                            textSize={lineSize}
                            onRest={() => {
                                const isOver = game.won || (game.tries === game.maxTries) || false;
                                if(!gameRef.current && isOver){
                                    gameRef.current = true;
                                    setGameOver(true);
                                }
                            }}
                        />
                    ))
                }
            </div>
            <div style={{marginTop: 25, display: 'flex', alignItems: 'center', flexDirection: 'column'}} id="keyboard">
                <Stack direction={'row'} gap={1}>
                    <Letter l="Q" add={appendToGuess} small={smallLetters} color={game.colorMap.Q} />
                    <Letter l="W" add={appendToGuess} small={smallLetters} color={game.colorMap.W}/>
                    <Letter l="E" add={appendToGuess} small={smallLetters} color={game.colorMap.E}/>
                    <Letter l="R" add={appendToGuess} small={smallLetters} color={game.colorMap.R}/>
                    <Letter l="T" add={appendToGuess} small={smallLetters} color={game.colorMap.T}/>
                    <Letter l="Y" add={appendToGuess} small={smallLetters} color={game.colorMap.Y}/>
                    <Letter l="U" add={appendToGuess} small={smallLetters} color={game.colorMap.U}/>
                    <Letter l="I" add={appendToGuess} small={smallLetters} color={game.colorMap.I}/>
                    <Letter l="O" add={appendToGuess} small={smallLetters} color={game.colorMap.O}/>
                    <Letter l="P" add={appendToGuess} small={smallLetters} color={game.colorMap.P}/>
                </Stack>
                <Stack direction={'row'} gap={1} sx={{marginTop: 1}}>
                    <Letter l="A" add={appendToGuess} small={smallLetters} color={game.colorMap.A}/>
                    <Letter l="S" add={appendToGuess} small={smallLetters} color={game.colorMap.S}/>
                    <Letter l="D" add={appendToGuess} small={smallLetters} color={game.colorMap.D}/>
                    <Letter l="F" add={appendToGuess} small={smallLetters} color={game.colorMap.F}/>
                    <Letter l="G" add={appendToGuess} small={smallLetters} color={game.colorMap.G}/>
                    <Letter l="H" add={appendToGuess} small={smallLetters} color={game.colorMap.H}/>
                    <Letter l="I" add={appendToGuess} small={smallLetters} color={game.colorMap.I}/>
                    <Letter l="K" add={appendToGuess} small={smallLetters} color={game.colorMap.K}/>
                    <Letter l="L" add={appendToGuess} small={smallLetters} color={game.colorMap.L}/>
                </Stack>
                <Stack direction={'row'} gap={1} sx={{marginTop: 1}}>
                    <Letter l={<PublishOutlinedIcon/>} add={appendToGuess} small={smallLetters} proxyKey="Enter"/>
                    <Letter l="Z" add={appendToGuess} small={smallLetters} color={game.colorMap.Z}/>
                    <Letter l="X" add={appendToGuess} small={smallLetters} color={game.colorMap.X}/>
                    <Letter l="C" add={appendToGuess} small={smallLetters} color={game.colorMap.C}/>
                    <Letter l="V" add={appendToGuess} small={smallLetters} color={game.colorMap.V}/>
                    <Letter l="B" add={appendToGuess} small={smallLetters} color={game.colorMap.B}/>
                    <Letter l="N" add={appendToGuess} small={smallLetters} color={game.colorMap.N}/>
                    <Letter l="M" add={appendToGuess} small={smallLetters} color={game.colorMap.M}/>
                    <Letter l={<BackspaceOutlinedIcon />} add={appendToGuess} small={smallLetters} proxyKey="Backspace"/>
                </Stack>
            </div>
            <Modal
                id="game_start"
                open={!game.word}
            >
                <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 100,
                        p: 4,
                        borderRadius: '10px'
                    }}>
                <Typography variant="h5" component="h2" sx={{textAlign: 'center', marginBottom: 1.5}}>
                    Select Game Rules
                </Typography>
                <div style={{padding: 5}}>
                    <form onSubmit={handleGameStart}>
                        <TextField
                            autoFocus
                            type="number" 
                            label="Word Length" 
                            fullWidth
                            defaultValue={5} slotProps={{htmlInput: {min: 3}, inputLabel: {shrink: true}}}
                        />
                        <p/>
                        <TextField 
                            type="number" 
                            label="Maximum Tries" 
                            fullWidth
                            defaultValue={6} slotProps={{htmlInput: {min: 1}, inputLabel: {shrink: true}}}
                        /><p/>
                        <Button variant="outlined" sx={{width: '100%'}} type="submit">Start</Button><p/>
                        <Button color="secondary" variant="outlined" sx={{width: '100%'}} onClick={() => navigate("/")}>Return to Home</Button>
                    </form>
                </div>
                </Box>
            </Modal>
            <Modal
                id="game_over"
                open={gameOver}
            >
                <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 100,
                        p: 4,
                        borderRadius: '10px',
                        textAlign: 'center',
                    }}>
                <Typography variant="h5" component="h2" sx={{textAlign: 'center', marginBottom: 1.5}}>
                    {game.won ? "You won!" : "Game Over: You lost"}
                </Typography>
                <div style={{textAlign: 'left', marginLeft: '25%'}}>
                    <Typography>
                        Current Streak: {gameStats.streak}
                    </Typography>
                    <Typography>
                        Tries: {gameStats.tries}
                    </Typography>
                    <Typography>
                        Time: {gameStats.time}
                    </Typography>
                    <br/>
                </div>
                <Button variant="contained" color="info" onClick={() => startGame()}>Play Again</Button>{' '}
                <Button variant="contained" color="secondary" onClick={resetGame}>Main Menu</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default function Wordle(){
    return (
        <div style={{position: 'relative'}} className="sectionBlock">
            <Content />
            <div style={{position: 'absolute', top: -10, opacity: 0, zIndex: -1}}>
                <Canvas linear flat style={{width: 0.1, height: 0.1}} frameloop="always"><></></Canvas>
            </div>
        </div>
    )
}