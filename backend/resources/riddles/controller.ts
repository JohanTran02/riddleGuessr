import OpenAI from "openai";
import "dotenv/config"
import { asyncErrorHandler } from "../Error/asyncErrorHandler";
import { Request, Response } from "express";
import { zodResponseFormat } from "openai/helpers/zod"
import { ProblemTypes, Riddles } from "./types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const systemPrompt = `You are an expert puzzle maker. You create challenging and engaging riddles, logical problems, and brain teasers. Each problem should be fun, thought-provoking, and appropriate for all audiences. Provide concise and clear answers and explanations.`
const userPrompt = `Generate a JSON with 10 cognitive problems that can include any combination of riddles, logical problems, and brain teasers. Each problem should have the following properties:
- id: a unique identifier.
- question: the problem question (keep it brief).
- answer: a unique answer.
- reason: a brief explanation (1 sentence max).
Avoid discriminatory, religious, political, or harmful content. Ensure that the questions are challenging and vary in problem type.`;

const getRiddles = asyncErrorHandler(async (req: Request<{}, {}, { problemType: ProblemTypes }>, res: Response) => {
    const response = await openai.beta.chat.completions.parse({
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            { role: "user", content: userPrompt },
        ],
        model: "gpt-4o-mini",
        response_format: zodResponseFormat(Riddles, "riddles")
    });

    const riddle = response.choices[0].message.parsed;
    res.json(riddle);
})

export { getRiddles }