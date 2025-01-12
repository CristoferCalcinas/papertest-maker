"use server";

import { prisma } from "@/prisma";
import type { Exam } from "../render-exams/types";

export const getAllExamsByUser = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (typeof userId !== "string") {
    throw new Error("User ID must be a string");
  }

  try {
    const exams = await prisma.exam.findMany({
      where: { userId },
      include: { questions: true, project: true },
    });

    if (!exams) {
      throw new Error("No exams found for the given user ID");
    }

    const formatedExams: Exam[] = exams.map((exam) => {
      const questionCount = exam.questions.length;
      const questions = exam.questions.slice(0, 2)
        ? exam.questions.slice(0, 2).map((q) => q.question)
        : [];
      return {
        id: exam.id,
        title: exam.title,
        createdAt: exam.createdAt,
        questionCount,
        project: exam.project ? exam.project.name : "",
        questions,
        status: "draft",
      };
    });

    return formatedExams;
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw new Error("Failed to fetch exams");
  }
};
