import { create } from "zustand";

interface ExamState {
  exams: Exam[];
  selectedQuestion: Exam | null;
  error: string | null;
  isHydrated: boolean;
}

interface ExamActions {
  addExam: (
    exam: Omit<Exam, "id" | "createdAt" | "status" | "completionAnswers">
  ) => Exam;
  updateExam: (id: string, exam: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  clearEditing: () => void;
  editQuestion: (id: string) => void;
  changeCorrectAnswers: (
    idQuestion: string,
    correctAnswers: string[],
    newQuestionId?: string
  ) => void;
  hydrate: (exams: Exam[]) => void;
}

type ExamStore = ExamState & ExamActions;

export const useExamStore = create<ExamStore>((set, get) => ({
  exams: [],
  selectedQuestion: null,
  isHydrated: false,
  error: null,

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

  changeCorrectAnswers: (idQuestion, correctAnswers, newQuestionId) => {
    if (!newQuestionId) {
      set((state) => ({
        exams: state.exams.map((exam) =>
          exam.id === idQuestion
            ? { ...exam, completionAnswers: correctAnswers, status: "reviewed" }
            : exam
        ),
      }));
      return;
    }
    set((state) => ({
      exams: state.exams.map((exam) =>
        exam.id === idQuestion
          ? {
              ...exam,
              completionAnswers: correctAnswers,
              status: "reviewed",
              id: newQuestionId,
            }
          : exam
      ),
    }));
  },

  hydrate: (exams) => {
    set({
      exams,
      isHydrated: true,
    });
  },
}));
