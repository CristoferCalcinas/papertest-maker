import { prisma } from "@/prisma";
import { auth } from "@/auth";

import { EmptyState } from "./empty/empty-state";
import { ExamList } from "./list-main/exam-list";
import { PageHeader } from "./header/page-header";
import { StadisticsTabs } from "./dashboard-stadistics/stadistics-tabs";

export const DashboardHome = async () => {
  //? ELIMINAR cuando se implemente recibir los examenes por props
  const session = await auth();

  const examtodb = await prisma.exam.findMany({
    where: { userId: session!.user.id },
    orderBy: { updatedAt: "desc" },
    include: { questions: true },
    take: 2,
  });

  const formattedExams = examtodb.map((exam) => {
    const questionCount = exam.questions.length;
    const titleCapitalized =
      exam.title.charAt(0).toUpperCase() + exam.title.slice(1);

    return {
      createdAt: exam.createdAt.toDateString(),
      description: exam.description || "SIN-DESCRIPCION",
      grade: exam.grade || "SIN-GRADO",
      id: exam.id,
      imageUrl: exam.imageUrl || "/pila-de-libros.jpg",
      lastModifiedAt: exam.updatedAt.toDateString(),
      questions: questionCount.toString(),
      subject: exam.subject || "SIN-MATERIA",
      title: titleCapitalized,
    };
  });

  if (!formattedExams.length) {
    return <EmptyState />;
  }

  return (
    <>
      <PageHeader />

      <ExamList exams={formattedExams} />

      <StadisticsTabs />
    </>
  );
};
