import { DistractorResponse } from "../types/openia-response.type";

export function processOpenAIResponse(response: string): DistractorResponse[] {
  try {
    if (!response) {
      throw new Error("Respuesta vacía de OpenAI");
    }

    const parsedResponse = JSON.parse(response);

    return parsedResponse.distractors;
  } catch (error) {
    throw new Error("Error al procesar la respuesta de OpenAI");
  }
}
