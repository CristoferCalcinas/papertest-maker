"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const createExam = async (examName: string, answersCount: string) => {
  const session = await auth();
  console.log({ examName, answersCount, session });

  if (!session?.user?.id) return;

  const exam = await prisma.exam.create({
    data: {
      title: examName,
      answersCount: parseInt(answersCount),
      userId: session.user.id,
    },
  });

  console.log({ exam });
};
