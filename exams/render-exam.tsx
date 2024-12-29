"use client";

import { useState } from "react";
import { ExamCard } from "./render-exam-card";

const examCardItems: {
  id: string;
  question: string;
  correctAnswer: string;
  createdAt: Date;
  status: "pending" | "reviewed" | "archived";
  onToggleAnswer: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: () => void;
}[] = [
  {
    id: "1",
    question: "¿Cuál es el planeta más grande del Sistema Solar?",
    correctAnswer: "Júpiter",
    createdAt: new Date(),
    status: "pending",
    onToggleAnswer: () => {},
    onEdit: () => {},
    onDelete: () => {},
    onStatusChange: () => {},
  },
  {
    id: "2",
    question: "¿En qué año comenzó la Primera Guerra Mundial?",
    correctAnswer: "1914",
    createdAt: new Date(),
    status: "reviewed",
    onToggleAnswer: () => {},
    onEdit: () => {},
    onDelete: () => {},
    onStatusChange: () => {},
  },
  {
    id: "3",
    question: "¿Quién pintó La Noche Estrellada?",
    correctAnswer: "Vincent van Gogh",
    createdAt: new Date(),
    status: "pending",
    onToggleAnswer: () => {},
    onEdit: () => {},
    onDelete: () => {},
    onStatusChange: () => {},
  },
];

export const RenderExam = () => {
  const [examCardState, setExamCardState] = useState(examCardItems);

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
          onToggleAnswer={examCard.onToggleAnswer}
          onEdit={examCard.onEdit}
          onDelete={examCard.onDelete}
          onStatusChange={examCard.onStatusChange}
        />
      ))}
    </div>
  );
};
