"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const createExam = async (examName: string, questionsCount: string) => {
  const session = await auth();
  console.log({ examName, questionsCount, session });

  if (!session?.user?.id) return;

  const exam = await prisma.exam.create({
    data: {
      title: examName,
      answersCount: parseInt(questionsCount),
      userId: session.user.id,
    },
  });

  console.log({ exam });
};
