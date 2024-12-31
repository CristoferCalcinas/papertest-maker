//! TODO: check the paper https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags

const prompt = `# Smart Distractor Generator

  INPUT:
  {
    "question": "¿$[1]?",
    "correct_answer": "$[2]",
    "number_of_distractors": $[3],
    "output_language": "es"
  }

  INSTRUCTIONS:
  1. CRITICAL: Generate ONLY incorrect but highly plausible answers
  2. MUST:
     - Match the format/style of the correct answer
     - Be grammatically correct
     - Be logically possible within the context
     - Have similar length and complexity
     - Be distinct from each other
     - Represent common misconceptions or related concepts
  3. MUST NOT:
     - Be partially correct
     - Be obviously wrong
     - Contain grammatical hints
     - Be humorous or nonsensical
     - Repeat information
  4. ANALYZE:
     - Answer type (definition, number, date, name, etc.)
     - Subject/field
     - Common error patterns
  5. OUTPUT:
     - ONLY return the JSON structure
     - NO explanations outside the JSON
     - NO additional text or markdown
     - ALL fields must be in the specified output_language

  OUTPUT FORMAT:
  {
    "analysis": {
      "answer_type": "...",
      "subject": "...",
      "error_pattern": "..."
    },
    "correct_answer": "...",
    "distractors": [
      {
        "answer": "...",
        "reasoning": "...",
        "error_type": "..."
      }
    ]
  }`;

export function buildPrompt(
  question: string,
  correctAnswer: string,
  numberOfDistractors: number,
  outputLanguage?: string
): string {
  return prompt
    .replace("$[1]", question)
    .replace("$[2]", correctAnswer)
    .replace("$[3]", numberOfDistractors.toString())
    .replace("$[4]", outputLanguage || "es");
}
