import { create } from "zustand";

interface ExamStore {
  exams: Exam[];
  selectedQuestion: Exam | null;

  addExam: (
    exam: Omit<Exam, "id" | "createdAt" | "status" | "completionAnswers">
  ) => Exam;
  updateExam: (id: string, exam: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  clearEditing: () => void;
  editQuestion: (id: string) => void;
  changeCorrectAnswers: (idQuestion: string, correctAnswers: string[]) => void;
}

export const useExamStore = create<ExamStore>((set, get) => ({
  exams: [
    {
      id: "1",
      question: "¿Cuál es el planeta más grande del Sistema Solar?",
      correctAnswer: "Júpiter",
      createdAt: "2021-09-01T00:00:00.000Z",
      status: "pending",
      completionAnswers: null,
    },
    {
      id: "2",
      question: "¿En qué año comenzó la Primera Guerra Mundial?",
      correctAnswer: "1914",
      createdAt: "2021-09-02T00:00:00.000Z",
      status: "reviewed",
      completionAnswers: null,
    },
    {
      id: "3",
      question: "¿Quién pintó La Noche Estrellada?",
      correctAnswer: "Vincent van Gogh",
      createdAt: "2021-09-03T00:00:00.000Z",
      status: "pending",
      completionAnswers: null,
    },
  ],
  selectedQuestion: null,

  addExam: (exam) => {
    const newExam = {
      ...exam,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      status: "pending" as const,
      completionAnswers: null,
    };
    set((state) => ({
      exams: [...state.exams, { ...newExam }],
    }));
    return newExam;
  },

  updateExam: (id, exam) =>
    set((state) => ({
      exams: state.exams.map((e) => (e.id === id ? { ...e, ...exam } : e)),
    })),

  deleteExam: (id) => {
    if (get().selectedQuestion?.id === id) {
      set({ selectedQuestion: null });
    }

    set((state) => ({
      exams: state.exams.filter((e) => e.id !== id),
    }));
  },

  clearEditing: () => set({ selectedQuestion: null }),

  editQuestion: (id) => {
    const exam = get().exams.find((e) => e.id === id);
    set({ selectedQuestion: exam || null });
  },

  changeCorrectAnswers: (idQuestion, correctAnswers) => {
    set((state) => ({
      exams: state.exams.map((exam) =>
        exam.id === idQuestion
          ? { ...exam, completionAnswers: correctAnswers, status: "reviewed" }
          : exam
      ),
    }));
  },
}));
