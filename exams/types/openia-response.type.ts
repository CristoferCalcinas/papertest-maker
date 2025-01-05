export interface DistractorResponse {
  answer: string;
  reasoning: string;
  errorType: string;
}

export interface OpenAIResponse {
  questionId: string;
  distractors: DistractorResponse[];
}

export interface ProcessedAnswers {
  questionId: string;
  answers: string[];
}
