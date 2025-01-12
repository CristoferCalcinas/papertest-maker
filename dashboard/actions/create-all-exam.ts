"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import type { $Enums } from "@prisma/client";

type CreateAllExam = {
  title: string;
  answersCount: number;
  description: string;
  subject: string;
  difficulty: $Enums.Difficulty;
  grade: $Enums.Grade;
  examStatus: $Enums.ExamStatus;
};

export const createAllExam = async (
  exam: CreateAllExam,
  imageUrl: string | null
): Promise<{ id: string } | null> => {
  try {
    if (!exam.title || exam.answersCount < 1) {
      throw new Error("Datos de examen inválidos");
    }

    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Usuario no autenticado");
    }

    return await prisma.exam.create({
      data: {
        ...exam,
        imageUrl,
        userId: session.user.id,
        answersCount: +exam.answersCount,
      },
      select: {
        id: true,
      },
    });
  } catch (error) {
    console.error("Error al crear examen:", error);
    return null;
  }
};
