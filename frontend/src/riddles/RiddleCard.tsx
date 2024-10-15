import { useEffect, useState } from "react";
import { Riddle } from "../../../backend/resources/riddles/types";

export default function RiddleCard({ riddle, show, gameState }: { riddle: Riddle, show: string[], gameState: string }) {
    const [showStyle, setShowStyle] = useState<"w-0" | "w-full">("w-full")
    const [open, setOpen] = useState(false)
    const [revealAnswer, setRevealAnswer] = useState(false);

    useEffect(() => {
        setShowStyle("w-full")
        setRevealAnswer(false)

        if (gameState === "active") {
            if (show.some((word) => word.toLowerCase() === riddle.answer.toLowerCase())) {
                setShowStyle("w-0")
                setRevealAnswer(true)
            }
        } else if (gameState === "inactive") {
            setShowStyle("w-0")
            setRevealAnswer(true)
        }
    }, [riddle.answer, show, gameState])

    return (
        <li className="riddle-card gap-1 py-2">

            <div className={`flex gap-1 ${gameState === "inactive" ? "cursor-pointer" : ""}`} onClick={gameState === "inactive" ? () => setOpen(!open) : () => { }}>
                {gameState === "inactive" && <div className="py-2 mr-2">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex justify-between w-full"
                    >
                        <svg
                            className="fill-indigo-500 shrink-0"
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center transition duration-200 ease-out ${open && "!rotate-180"
                                    }`}
                            />
                            <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center rotate-90 transition duration-200 ease-out ${open && "!rotate-180"
                                    }`}
                            />
                        </svg>
                    </button>
                </div>}
                <div className="text-lg">{riddle.question}</div>
                <div className="relative text-lg">
                    <div className={`transition-all absolute top-0 left-0 ${showStyle} h-full bg-blue-700`}></div>
                    <p>{revealAnswer ? riddle.answer : riddle.fakeAnswer}</p>
                </div>
            </div>
            <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600  ${open
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">{riddle.reason}</div>
            </div>
        </li>
    )
}