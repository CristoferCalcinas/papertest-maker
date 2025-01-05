"use server";

import { addQuestionToDb } from "./add-questionn-to-db";
import { makeOpenAIRequest } from "./openai";

import { buildPrompt } from "../helpers/buildPrompt";
import { processOpenAIResponse } from "../helpers/process-openia-response";

import type {
  DistractorResponse,
  OpenAIResponse,
  ProcessedAnswers,
} from "../types/openia-response.type";

const DEFAULT_DISTRACTORS = 3;

function validateInputParameters(
  question: string,
  answer: string,
  numberOfDistractors: number
): void {
  if (!question?.trim() || !answer?.trim()) {
    throw new Error("La pregunta y la respuesta son requeridas");
  }

  if (numberOfDistractors < 1) {
    throw new Error("El número de distractores debe ser mayor a 0");
  }
}

/**
 * Obtiene respuestas del API de OpenAI y guarda la pregunta en la base de datos
 */
async function fetchCompletion(
  prompt: string,
  idExam: string,
  correctAnswer: string,
  question: string
): Promise<OpenAIResponse> {
  try {
    const completion = await makeOpenAIRequest(prompt);
    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("Respuesta vacía de OpenAI");
    }

    const newQuestion = await addQuestionToDb(
      question,
      idExam,
      correctAnswer,
      completion
    );

    if (!newQuestion) {
      throw new Error("Error al guardar la pregunta en la base de datos");
    }

    return {
      questionId: newQuestion.id,
      distractors: processOpenAIResponse(response),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al generar respuestas: ${error.message}`);
    }
    throw new Error("Error inesperado al generar respuestas");
  }
}

/**
 * Genera respuestas distractoras para una pregunta
 * @throws {ValidationError | OpenAIError | DatabaseError}
 */
async function generateAnswers(
  question: string,
  answer: string,
  idExam: string,
  numberOfDistractors = DEFAULT_DISTRACTORS
): Promise<OpenAIResponse> {
  validateInputParameters(question, answer, numberOfDistractors);

  try {
    const prompt = buildPrompt(question, answer, numberOfDistractors);
    return await fetchCompletion(prompt, idExam, answer, question);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al generar respuestas: ${error.message}`);
    }
    throw new Error("Error inesperado al generar respuestas");
  }
}

/**
 * Procesa las respuestas y retorna el formato final
 * @throws {Error} Si no se pueden generar las respuestas
 */
export async function processAnswers(
  question: string,
  correctAnswer: string,
  numberOfDistractors: number,
  idExam: string
): Promise<ProcessedAnswers> {
  const generatedDistractors = await generateAnswers(
    question,
    correctAnswer,
    idExam,
    numberOfDistractors
  );

  if (!generatedDistractors) {
    throw new Error("No se pudieron generar las respuestas");
  }

  return {
    questionId: generatedDistractors.questionId,
    answers: generatedDistractors.distractors.map(
      (distractor: DistractorResponse) => distractor.answer
    ),
  };
}
