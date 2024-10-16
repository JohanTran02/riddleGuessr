import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CustomError, } from "../../../backend/resources/Error/types"
import { Riddle } from "../../../backend/resources/riddles/types"
import RiddleCard from './RiddleCard';
import RiddleInput from "./RiddleInput"
import RiddleStats from './RiddleStats';

function generateString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export default function RiddlesList({ setGuessCount, guessCount, gameState, show, setShow, setGameState }: {
    setGuessCount: Dispatch<SetStateAction<number>>,
    setGameState: Dispatch<SetStateAction<"active" | "inactive">>,
    gameState: string,
    guessCount: number,
    show: string[],
    setShow: Dispatch<SetStateAction<string[]>>
}) {
    const [guess, setGuess] = useState("");
    const [riddles, setRiddles] = useState<Riddle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const checkAnswer = () => {
        const findAnswer = riddles.find(riddle => riddle.answer.toLowerCase() === guess.toLowerCase());
        if (!findAnswer) {
            if (guessCount > 0) {
                setGuessCount(prevCount => prevCount - 1);
            }
            return;
        }

        if (show.find(answer => findAnswer.answer.toLowerCase() === answer.toLowerCase())) return;

        setShow([...new Set([...show, findAnswer.answer])])
    }

    const resetGame = () => {
        setGameState("active");
        setGuessCount(4);
        setShow([]);
    }

    useEffect(() => {

        const fetchRiddles = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/riddles', { method: "POST" });
                // const response = await fetch("fakeData.json")

                if (!response.ok) {
                    throw new CustomError('Network response was not ok', 400);
                }
                const { riddles: riddlesData }: { riddles: Riddle[] } = await response.json();
                const randomRiddles = riddlesData.sort(() => 0.5 - Math.random()).slice(0, 10);
                randomRiddles.forEach((riddle) => riddle.fakeAnswer = generateString(riddle.answer.length))
                setRiddles(randomRiddles)
            } catch (error) {
                if (error instanceof CustomError) {
                    setError(error.message);
                }
            }
            setLoading(false);
        }

        if (gameState === "active") {
            const timeout = setTimeout(() => fetchRiddles(), 500)
            return () => clearTimeout(timeout)
        }
    }, [gameState]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <RiddleInput setGuess={setGuess} gameState={gameState} checkAnswer={checkAnswer} />
            <ul className='list-none'>
                {riddles && riddles.map((riddle) => (
                    <RiddleCard key={riddle.id} riddle={riddle} show={show} gameState={gameState}></RiddleCard>
                ))}
            </ul>
            <RiddleStats show={show} guessCount={guessCount} resetGame={resetGame} gameState={gameState} setGameState={setGameState} />

        </div>
    );
};