import { invokeLLM } from "../server/_core/llm";
import { buildStudyJournalPrompt, normalizeStudyJournal, parseBbcWorldRss } from "../server/studyJournal";

const model = process.argv[2] ?? "gpt-5-mini";
const rssResponse = await fetch("https://feeds.bbci.co.uk/news/world/rss.xml", {
  headers: { accept: "application/rss+xml, application/xml, text/xml" },
});
if (!rssResponse.ok) throw new Error(`RSS request failed: ${rssResponse.status}`);

const sources = parseBbcWorldRss(await rssResponse.text());
const startedAt = Date.now();
const response = await invokeLLM({
  model,
  messages: [
    { role: "system", content: "You are a careful educational editor. Use only the supplied current-news candidates. Never fabricate events, sources, or publication times." },
    { role: "user", content: buildStudyJournalPrompt("english", "中学生", sources) },
  ],
  ...(model.startsWith("gemini") ? { maxTokens: 6000, reasoningEffort: "low" as const } : model.startsWith("claude") ? { maxTokens: 1800 } : { maxCompletionTokens: 1200, reasoning: { effort: "minimal" } }),
  outputSchema: {
    name: "study_journal",
    strict: true,
    schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        passage: { type: "string" },
        translation: { type: "string" },
        annotations: { type: "array", items: { type: "object", properties: { kind: { type: "string", enum: ["word", "grammar", "kanji"] }, term: { type: "string" }, meaning: { type: "string" }, explanation: { type: "string" }, onyomi: { type: "string" }, kunyomi: { type: "string" } }, required: ["kind", "term", "meaning", "explanation", "onyomi", "kunyomi"], additionalProperties: false } },
        sources: { type: "array", items: { type: "object", properties: { title: { type: "string" }, url: { type: "string" }, publisher: { type: "string" }, publishedAt: { type: "string" } }, required: ["title", "url", "publisher", "publishedAt"], additionalProperties: false } },
      },
      required: ["title", "passage", "translation", "annotations", "sources"],
      additionalProperties: false,
    },
  },
});

const content = response.choices[0]?.message.content;
if (typeof content !== "string") throw new Error("LLM response content is missing");
const journal = normalizeStudyJournal(JSON.parse(content), "english", "中学生");
console.log(JSON.stringify({ model, elapsedMs: Date.now() - startedAt, title: journal.title, passageLength: journal.passage.length, annotations: journal.annotations.length, sources: journal.sources.length }, null, 2));
