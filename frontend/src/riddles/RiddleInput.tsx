import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function RiddleInput({ setGuess, gameState, checkAnswer }: {
    checkAnswer: () => void,
    setGuess: Dispatch<SetStateAction<string>>,
    gameState: string,
}) {
    const [inputValue, setInputValue] = useState("");
    const checkGuess = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        setGuess(inputValue)
        if (event.key === "Enter" && event.currentTarget.value.length > 0) {
            checkAnswer();
        }
    }

    useEffect(() => {
        if (gameState === "inactive") setInputValue("")
    }, [gameState])

    return (
        <>
            <label className="text-xl">
                Guess:
                <input type="text" name="checkGuess"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    maxLength={20}
                    onKeyUp={(e) => checkGuess(e)}
                    disabled={gameState === "inactive"}
                    className="ml-2"
                />
            </label>
        </>
    )
}