const passage = "City leaders approved a plan to expand public transport after residents asked for faster and cleaner travel. The plan will add electric buses and create safer routes for people who walk or cycle. Officials said the changes could reduce traffic and improve air quality over the next three years.";

const schema = {
  name: "study_journal_questions_smoke",
  strict: true,
  schema: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        minItems: 5,
        maxItems: 5,
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            kind: { type: "string", enum: ["choice", "writing"] },
            focus: { type: "string", enum: ["comprehension", "vocabulary", "summary"] },
            prompt: { type: "string" },
            choices: { type: "array", items: { type: "string" } },
            correctChoice: { type: "integer" },
            sampleAnswer: { type: "string" },
            explanation: { type: "string" },
            evidence: { type: "string" },
            rubric: { type: "string" },
          },
          required: ["id", "kind", "focus", "prompt", "choices", "correctChoice", "sampleAnswer", "explanation", "evidence", "rubric"],
          additionalProperties: false,
        },
      },
    },
    required: ["questions"],
    additionalProperties: false,
  },
};

const response = await fetch(`${process.env.BUILT_IN_FORGE_API_URL.replace(/\/$/, "")}/v1/chat/completions`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}` },
  body: JSON.stringify({
    model: "gpt-5-mini",
    messages: [
      { role: "system", content: "You are a precise reading-test editor. Return JSON only." },
      { role: "user", content: `Create exactly 5 questions using ONLY this passage. Create exactly 3 choice/comprehension questions, 1 choice/vocabulary question, and 1 writing/summary question asking for a 35-55 word English summary. Choice questions have four Japanese options and a 0-3 correctChoice. The writing question has choices=[] and correctChoice=-1. Every evidence field must be an exact quote from the passage. All explanations and rubrics are Japanese.\n\nPASSAGE:\n${passage}` },
    ],
    max_completion_tokens: 3200,
    reasoning: { effort: "medium" },
    response_format: { type: "json_schema", json_schema: schema },
  }),
});

if (!response.ok) throw new Error(`LLM request failed: ${response.status} ${await response.text()}`);
const payload = await response.json();
const output = JSON.parse(payload.choices?.[0]?.message?.content ?? "{}");
const questions = output.questions ?? [];
const metrics = {
  total: questions.length,
  choice: questions.filter(question => question.kind === "choice").length,
  writing: questions.filter(question => question.kind === "writing").length,
  comprehension: questions.filter(question => question.focus === "comprehension").length,
  vocabulary: questions.filter(question => question.focus === "vocabulary").length,
  summary: questions.filter(question => question.focus === "summary").length,
  allEvidenceInPassage: questions.every(question => passage.includes(question.evidence)),
};
if (metrics.total !== 5 || metrics.choice !== 4 || metrics.writing !== 1 || metrics.comprehension !== 3 || metrics.vocabulary !== 1 || metrics.summary !== 1 || !metrics.allEvidenceInPassage) throw new Error(`Unexpected question structure: ${JSON.stringify(metrics)}`);
console.log(JSON.stringify(metrics));
