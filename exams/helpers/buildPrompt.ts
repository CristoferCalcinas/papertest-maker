//! TODO: check the paper https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags

const prompt = `<prompt>
  <task>Smart Distractor Generator</task>
  
  <input>
    <parameters>
      <question>${"$[1]"}</question>
      <correctAnswer>${"$[2]"}</correctAnswer>
      <numberOfDistractors>${"$[3]"}</numberOfDistractors>
      <outputLanguage>${"$[4]"}</outputLanguage>
    </parameters>
  </input>

  <rules>
    <critical>Generate ONLY incorrect but highly plausible answers</critical>
    <requirements>
      <must>
        <rule>Match the format/style of the correct answer</rule>
        <rule>Be grammatically correct</rule>
        <rule>Be logically possible within the context</rule>
        <rule>Have similar length and complexity</rule>
        <rule>Be distinct from each other</rule>
        <rule>Represent common misconceptions or related concepts</rule>
      </must>
      <mustNot>
        <rule>Be partially correct</rule>
        <rule>Be obviously wrong</rule>
        <rule>Contain grammatical hints</rule>
        <rule>Be humorous or nonsensical</rule>
        <rule>Repeat information</rule>
      </mustNot>
    </requirements>
  </rules>

  <analysis>
    <criteria>
      <item>Answer type (definition, number, date, name, etc.)</item>
      <item>Subject/field</item>
      <item>Common error patterns</item>
    </criteria>
  </analysis>

  <outputRequirements>
    <format>JSON</format>
    <constraints>
      <constraint>ONLY return the JSON structure</constraint>
      <constraint>NO explanations outside the JSON</constraint>
      <constraint>NO additional text or markdown</constraint>
      <constraint>ALL fields must be in the specified output_language</constraint>
    </constraints>
  </outputRequirements>

  <outputFormat>
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
    }
  </outputFormat>
</prompt>`;

export function buildPrompt(
  question: string,
  correctAnswer: string,
  numberOfDistractors: number,
  outputLanguage: string = "es"
): string {
  // Sanitizar inputs para evitar inyección XML
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const replacements = {
    "$[1]": sanitizeInput(question),
    "$[2]": sanitizeInput(correctAnswer),
    "$[3]": numberOfDistractors.toString(),
    "$[4]": sanitizeInput(outputLanguage),
  };

  return Object.entries(replacements).reduce(
    (acc, [key, value]) => acc.replace(key, value),
    prompt
  );
}
