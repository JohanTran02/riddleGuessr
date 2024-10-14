import OpenAI from "openai";
import "dotenv/config"
import { asyncErrorHandler } from "../Error/asyncErrorHandler";
import { Request, Response } from "express";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getRiddles = asyncErrorHandler(async (req: Request, res: Response) => {
    const response = await openai.chat.completions.create({
        messages: [
            { role: "user", content: "Create 10 riddles" },
            { role: "assistant", content: "Here's a riddle for you:" },
        ],
        model: "gpt-4o-mini",
    });

    const riddle = response.choices[0].message.content;
    res.json(riddle);
})

export { getRiddles }