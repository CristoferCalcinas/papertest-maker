"use client";

import { useState } from "react";
import { ExamCard } from "./render-exam-card";
import { useExamStore } from "./store/create-exam-store";

export const RenderExam = () => {
  const [examCardState, setExamCardState] = useState(
    useExamStore((state) => state.exams)
  );

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
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Preguntas de Examen</h1>

      {examCardState.map((examCard) => (
        <ExamCard
          key={examCard.id}
          id={examCard.id}
          question={examCard.question}
          correctAnswer={examCard.correctAnswer}
          createdAt={examCard.createdAt}
          status={examCard.status}
          onToggleAnswer={onToggleAnswer}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};