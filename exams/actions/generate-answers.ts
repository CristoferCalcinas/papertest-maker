"use server";

import OpenAI from "openai";

import { buildPrompt } from "../helpers/buildPrompt";
import { parseResponse } from "../helpers/parseResponse";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function fetchCompletion(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    store: true,
    messages: [{ role: "user", content: prompt }],
  });
  const response = parseResponse(completion.choices[0].message);
  return response?.distractors || [];
}

export const generateAnswers = async (
  question: string,
  answer: string,
  numberOfDistractors: number = 3
) => {
  try {
    const prompt = buildPrompt(question, answer, numberOfDistractors);
    return await fetchCompletion(prompt);
  } catch (error) {
    console.log({ error });
    return [];
  }
};
