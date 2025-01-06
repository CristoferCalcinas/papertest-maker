import { auth } from "@/auth";

import { getAllExamsByUser } from "@/exams/actions/get-all-exams-by-user";

import { RenderAllExams } from "@/exams/render-exams/render-all-exams";

export default async function ExamsPage() {
  const session = await auth();

  if (!session) return null;

  const exams = await getAllExamsByUser(session.user.id);

  if (!exams) return null;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-center mt-8 mb-4">
        Exámenes Todos los exámenes
      </h1>

      <RenderAllExams exams={exams} />
    </div>
  );
}
