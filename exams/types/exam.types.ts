interface Exam {
  id: string;
  question: string;
  correctAnswer: string;
  createdAt: Date;
  status: "pending" | "reviewed" | "archived";
}
