import OpenAI from "openai";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function makeOpenAIRequest(prompt: string) {
  try {
    return await openaiClient.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo-0125",
      temperature: 0.7,
      max_tokens: 1500,
      frequency_penalty: 0.3,
      presence_penalty: 0.1,
      response_format: { type: "json_object" },
      seed: 123,
    });
  } catch (error) {
    throw new Error("Error al comunicarse con OpenAI");
  }
}
