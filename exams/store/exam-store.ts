import { create } from "zustand";

interface ExamStore {
  exams: Exam[];
  addExam: (exam: Omit<Exam, "id" | "createdAt" | "status">) => void;
  updateExam: (id: string, exam: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
}

export const useExamStore = create<ExamStore>((set) => ({
  exams: [
    {
      id: "1",
      question: "¿Cuál es el planeta más grande del Sistema Solar?",
      correctAnswer: "Júpiter",
      createdAt: "2021-09-01T00:00:00.000Z",
      status: "pending",
    },
    {
      id: "2",
      question: "¿En qué año comenzó la Primera Guerra Mundial?",
      correctAnswer: "1914",
      createdAt: "2021-09-02T00:00:00.000Z",
      status: "reviewed",
    },
    {
      id: "3",
      question: "¿Quién pintó La Noche Estrellada?",
      correctAnswer: "Vincent van Gogh",
      createdAt: "2021-09-03T00:00:00.000Z",
      status: "pending",
    },
  ],

  addExam: (exam) =>
    set((state) => ({
      exams: [
        ...state.exams,
        {
          ...exam,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          status: "pending",
        },
      ],
    })),

  updateExam: (id, exam) =>
    set((state) => ({
      exams: state.exams.map((e) => (e.id === id ? { ...e, ...exam } : e)),
    })),

  deleteExam: (id) =>
    set((state) => ({
      exams: state.exams.filter((e) => e.id !== id),
    })),
}));
