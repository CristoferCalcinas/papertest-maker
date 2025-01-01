"use server";

import OpenAI from "openai";

import { buildPrompt } from "../helpers/buildPrompt";

import type { DistractorResponse } from "../types/distractor-response.type";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Obtiene respuestas del API de OpenAI.
 * @param prompt - Prompt para enviar al API.
 * @param options - Configuración opcional para la petición.
 */
async function fetchCompletion(prompt: string): Promise<DistractorResponse[]> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo-0125",
      temperature: 0.7,
      max_tokens: 1500,
      frequency_penalty: 0.3,
      presence_penalty: 0.1,
      response_format: { type: "json_object" },
      seed: 123,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error("No response from OpenAI");

    return JSON.parse(response).distractors;
  } catch (error) {
    console.error("[OpenAI Error]:", error);
    throw error;
  }
}

const DEFAULT_DISTRACTORS = 3;

/**
 * Genera respuestas distractoras para una pregunta.
 * @param question - Pregunta para generar distractores.
 * @param answer - Respuesta correcta.
 * @param numberOfDistractors - Número de distractores a generar.
 */
async function generateAnswers(
  question: string,
  answer: string,
  numberOfDistractors = DEFAULT_DISTRACTORS
): Promise<DistractorResponse[]> {
  if (!question?.trim() || !answer?.trim()) {
    throw new Error("Question and answer are required");
  }

  try {
    const prompt = buildPrompt(question, answer, numberOfDistractors);
    return await fetchCompletion(prompt);
  } catch (error) {
    console.error("[Generate Answers Error]:", error);
    return [];
  }
}

export const processAnswers = async (
  question: string,
  correctAnswer: string
) => {
  const generatedDistractors = await generateAnswers(question, correctAnswer);

  if (!generatedDistractors) throw new Error("No se pudo generar respuestas");

  const answers = generatedDistractors.map((r) => r.answer);
  return answers;
};
