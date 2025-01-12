import { prisma } from "@/prisma";

interface Props {
  params: Promise<{ examId: string }>;
}

export default async function ExamPage({ params }: Props) {
  const { examId: id } = await params;

  const allExam = await prisma.exam.findUnique({
    where: { id },
    include: { questions: true },
  });

  return (
    <div>
      <h1>Hello Page</h1>
      <pre>
        <code>{JSON.stringify(allExam, null, 2)}</code>
      </pre>
    </div>
  );
}
