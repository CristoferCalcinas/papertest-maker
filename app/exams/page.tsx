import { auth } from "@/auth";
import { prisma } from "@/prisma";

import { RenderAllExams } from "@/exams/render-exams/render-all-exams";

export default async function ExamsPage() {
  const session = await auth();

  if (!session) return null;

  const exams = await prisma.exam.findMany({
    where: { userId: session.user.id },
  });

  console.log({ exams });

  return (
    <div className="flex flex-col items-center">
      <h1>Exams</h1>
      <p>Here you can take exams</p>

      <RenderAllExams />
    </div>
  );
}
