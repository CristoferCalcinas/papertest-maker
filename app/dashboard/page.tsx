import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { DashboardHome } from "@/dashboard/dashboard-home";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/auth/login");
  }

  const examtodb = await prisma.exam.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: { questions: true },
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

  return (
    <>
      <DashboardHome exams={formattedExams.slice(0, 2)} />;
    </>
  );
}
