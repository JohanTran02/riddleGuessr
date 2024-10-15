import { useEffect, useState } from "react";

import RiddlesList from "./riddles/RiddlesList"

function App() {
  const [guessCount, setGuessCount] = useState(4);
  const [gameState, setGameState] = useState<"active" | "inactive">("active");
  const [show, setShow] = useState<string[]>([])

  useEffect(() => {
    if (guessCount === 0) setGameState("inactive");
    if (show.length === 10) setGameState("inactive")
  }, [guessCount, show.length])

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <RiddlesList setGuessCount={setGuessCount} guessCount={guessCount} gameState={gameState} setShow={setShow} show={show} setGameState={setGameState} />
      </div>
    </div>
  )
}

export default App
