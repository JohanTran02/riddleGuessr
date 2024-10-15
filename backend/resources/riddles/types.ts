import { z } from "zod"

type ProblemTypes = "kreativa utmaningar" | "Mönsterigenkänning" | "programmeringsproblem";

type Riddle = {
    id: string,
    question: string;
    answer: string;
    reason: string;
    fakeAnswer: string;
}

const riddleProperties = z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    reason: z.string(),
})

const Riddles = z.object({ riddles: z.array(riddleProperties) })

export { Riddles };
export type { ProblemTypes, Riddle };
