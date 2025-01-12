"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

interface CreateExamResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const createExam = async (
  examName: string,
  answersCount: string
): Promise<CreateExamResponse> => {
  try {
    if (!examName?.trim()) {
      return {
        success: false,
        error: "El nombre del examen es requerido",
      };
    }

    const parsedAnswersCount = parseInt(answersCount);
    if (isNaN(parsedAnswersCount) || parsedAnswersCount <= 0) {
      return {
        success: false,
        error: "La cantidad de respuestas debe ser un número válido mayor a 0",
      };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        error: "No se encontró una sesión válida",
      };
    }

    const exam = await prisma.exam.create({
      data: {
        title: examName.trim(),
        answersCount: parsedAnswersCount,
        userId: session.user.id,
      },
    });

    return {
      success: true,
      data: exam,
    };
  } catch (error) {
    return {
      success: false,
      error:
        "Error al crear el examen: " +
        (error instanceof Error ? error.message : "Error desconocido"),
    };
  }
};
