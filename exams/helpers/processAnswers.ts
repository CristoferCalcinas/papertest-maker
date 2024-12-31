import { generateAnswers } from "../actions/generate-answers";
import { DEFAULT_ANSWERS_COUNT } from "../schemas/exam-schemas";

export const processAnswers = async (
  questionId: string,
  question: string,
  correctAnswer: string,
  changeCorrectAnswers: (id: string, answers: string[]) => void
) => {
  const resp = await generateAnswers(
    question,
    correctAnswer,
    DEFAULT_ANSWERS_COUNT
  );
  
  if (!resp) throw new Error("No se pudo generar respuestas");

  const answers = resp.map((r) => r.answer);
  changeCorrectAnswers(questionId, answers);
  return answers;
};
