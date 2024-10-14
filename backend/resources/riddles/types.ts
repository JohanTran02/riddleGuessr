import { z } from "zod"

type ProblemTypes = "kreativa utmaningar" | "Mönsterigenkänning" | "programmeringsproblem";

const riddleProperties = z.object({
    question: z.string(),
    hints: z.array(z.string()),
    answer: z.string(),
    reasoning: z.string(),
})

const Riddles = z.object({ riddles: z.array(riddleProperties) })

export { Riddles, ProblemTypes }