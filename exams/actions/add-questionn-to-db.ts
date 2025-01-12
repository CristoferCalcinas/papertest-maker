"use server";

import { prisma } from "@/prisma";

/**
 * Añade una nueva pregunta a la base de datos
 * @param question Texto de la pregunta
 * @param examId ID del examen al que pertenece
 * @param correctAnswer Respuesta correcta
 * @param distractors JSON de distractores
 * @returns Object con el ID de la pregunta creada
 * @throws Error si los parámetros son inválidos o hay error en BD
 */
export const addQuestionToDb = async (
  question: string,
  examId: string,
  correctAnswer: string,
  distractors: any
) => {
  // Validaciones de entrada
  if (!question?.trim()) {
    throw new Error("La pregunta no puede estar vacía");
  }

  if (!examId?.trim()) {
    throw new Error("El ID del examen es requerido");
  }

  if (!correctAnswer?.trim()) {
    throw new Error("La respuesta correcta es requerida");
  }

  try {
    // Verificar si el examen existe
    const examExists = await prisma.exam.findUnique({
      where: { id: examId },
      select: { id: true },
    });

    if (!examExists) {
      throw new Error("El examen especificado no existe");
    }

    return await prisma.$transaction(async (tx) => {
      const newQuestion = await tx.question.create({
        data: {
          examId,
          question: question.trim(),
          correctAnswer: correctAnswer.trim(),
          distractors: distractors,
        },
        select: {
          id: true,
        },
      });

      await tx.exam.update({
        where: { id: examId },
        data: {
          updatedAt: new Date(),
        },
      });

      return newQuestion;
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al crear la pregunta: ${error.message}`);
    }
    throw new Error("Error inesperado al crear la pregunta");
  }
};
