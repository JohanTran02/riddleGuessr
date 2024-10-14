import OpenAI from "openai";
import "dotenv/config"
import { asyncErrorHandler } from "../Error/asyncErrorHandler";
import { Request, Response } from "express";
import { zodResponseFormat } from "openai/helpers/zod"
import { ProblemTypes, Riddles } from "./types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getRiddles = asyncErrorHandler(async (req: Request<{}, {}, { problemType: ProblemTypes }>, res: Response) => {
    const riddleAmount = 10;
    const response = await openai.beta.chat.completions.parse({
        messages: [
            {
                role: "system",
                content: `Du älskar problemlösning och dela med dig gåtor, logiska problem och tankeknep. Ditt uppdrag är att komma på problem som kräver kreativt utmaningar, inklusive gåtor, logiska problem och tankeknep.
                        Svaren på problemen ska endast innehålla ett ord och börja med en stor bokstav. Generera ${riddleAmount} varierade kreativa utmaningar och 3 ledtrådar som blir mer specifikt.`,
            },
            { role: "user", content: `Kan du generera kreativa utmaningar på svenska.` },
        ],
        model: "gpt-4o-mini",
        response_format: zodResponseFormat(Riddles, "riddles")
    });

    const riddle = response.choices[0].message.parsed;
    res.json(riddle);
})

export { getRiddles }