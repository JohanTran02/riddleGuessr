import { Dispatch, SetStateAction } from "react"

export default function RiddleStats({ guessCount, show, resetGame, gameState, setGameState }: {
    guessCount: number,
    show: string[],
    resetGame: () => void,
    gameState: string,
    setGameState: Dispatch<SetStateAction<"active" | "inactive">>,
}) {
    return (
        <div className="flex flex-col gap-8 mt-2">
            <div className="flex gap-12 ">
                {gameState === "active" ?
                    <button onClick={() => setGameState("inactive")} className="text-3xl">Give Up?</button>
                    :
                    <button onClick={resetGame} className="text-3xl">Try again?</button>
                }
            </div>
            <div className="flex gap-12 justify-center">
                <div className="text-3xl">Points: {`${show.length}/10`}</div>
                <div className="text-3xl">Guesses: {guessCount}</div>
            </div>
        </div>
    )
}