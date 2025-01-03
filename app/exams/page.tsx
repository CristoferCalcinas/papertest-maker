import { auth } from "@/auth";
import { prisma } from "@/prisma";

export default async function ExamsPage() {
  const session = await auth();

  const exams = await prisma.exam.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Exams</h1>
      <p>Here you can take exams</p>
      <pre>{JSON.stringify(exams, null, 2)}</pre>
    </div>
  );
}
