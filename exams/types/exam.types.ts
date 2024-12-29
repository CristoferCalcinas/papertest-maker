interface Exam {
  id: string;
  question: string;
  correctAnswer: string;
  createdAt: Date | string;
  status: "pending" | "reviewed" | "archived";
}
