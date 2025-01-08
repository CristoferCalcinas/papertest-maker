import { ExamManagement } from "@/dashboard/new-exam/exam-management";

export default function NewExamPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Gestión un nuevo examen
      </h1>
      <ExamManagement />
    </main>
  );
}
