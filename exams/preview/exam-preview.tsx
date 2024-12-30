"use client";

import { ExamCard } from "./exam-card";

import { useExamStore } from "../store/exam-store";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ExamPreview = () => {
  const exams = useExamStore((state) => state.exams);
  const editQuestion = useExamStore((state) => state.editQuestion);
  const deleteExam = useExamStore((state) => state.deleteExam);

  const handleToggleAnswer = (): void => {
    console.log("Toggle Answer");
  };

  const handleEditQuestion = (id: string): void => {
    editQuestion(id);
  };

  const handleDeleteQuestion = (idQuestion: string): void => {
    deleteExam(idQuestion);
  };

  const handleStatusChange = (): void => {
    console.log("Status Change");
  };

  return (
    <Card>
      <section
        className="container mx-auto p-4 space-y-4"
        aria-label="Vista previa del examen"
      >
        <CardHeader className="p-0">
          <header className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">
              Preguntas del Examen
            </h2>
            <span className="text-sm text-gray-500 text-center">
              {exams.length} {exams.length === 1 ? "pregunta" : "preguntas"}
            </span>
          </header>
        </CardHeader>
        <CardContent className="p-0">
          {exams.length === 0 ? (
            <div
              className="text-center py-12 bg-gray-50 rounded-lg"
              role="status"
              aria-label="No hay preguntas"
            >
              <p className="text-gray-500">
                No hay preguntas añadidas al examen
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {exams.map((examCard) => (
                <ExamCard
                  key={examCard.id}
                  {...examCard}
                  onToggleAnswer={handleToggleAnswer}
                  onEdit={() => handleEditQuestion(examCard.id)}
                  onDelete={() => handleDeleteQuestion(examCard.id)}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </CardContent>
      </section>
    </Card>
  );
};
