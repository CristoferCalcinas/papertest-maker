"use client";

import { ExamCard } from "./exam-card";
import { useExamStore } from "../store/exam-store";

export const ExamPreview = () => {
  const exams = useExamStore((state) => state.exams);

  const onToggleAnswer = () => {
    console.log("Toggle Answer");
  };

  const onEdit = () => {
    console.log("Edit");
  };

  const onDelete = () => {
    console.log("Delete");
  };

  const onStatusChange = () => {
    console.log("Status Change");
  };

  return (
    <section
      className="container mx-auto p-4 space-y-4"
      aria-label="Vista previa del examen"
    >
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Preguntas del Examen
        </h2>
        <span className="text-sm text-gray-500 text-center">
          {exams.length} {exams.length === 1 ? "pregunta" : "preguntas"}
        </span>
      </header>

      {exams.length === 0 ? (
        <div
          className="text-center py-12 bg-gray-50 rounded-lg"
          role="status"
          aria-label="No hay preguntas"
        >
          <p className="text-gray-500">No hay preguntas añadidas al examen</p>
        </div>
      ) : (
        <div className="space-y-4">
          {exams.map((examCard) => (
            <ExamCard
              key={examCard.id}
              {...examCard}
              onToggleAnswer={() => onToggleAnswer()}
              onEdit={() => onEdit()}
              onDelete={() => onDelete()}
              onStatusChange={() => onStatusChange()}
            />
          ))}
        </div>
      )}
    </section>
  );
};
