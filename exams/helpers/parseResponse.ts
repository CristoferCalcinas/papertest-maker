export const parseResponse = (response: any) => {
  try {
    if (!response.content) return null;

    const data = JSON.parse(response.content);

    const correctAnswer = data.correct_answer;
    const distractors = data.distractors.map((distractor: any) => ({
      answer: distractor.answer,
      reasoning: distractor.reasoning,
      errorType: distractor.error_type,
    }));

    const analysis = data.analysis || {};

    return { correctAnswer, distractors, analysis };
  } catch (error) {
    console.error("Error al analizar la respuesta:", error);
    return null;
  }
};
