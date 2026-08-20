import { invokeLLM } from "../server/_core/llm";
import { buildStudyJournalPrompt, normalizeStudyJournal, parseBbcWorldRss, selectStudyJournalSources } from "../server/studyJournal";

const response = await fetch("https://feeds.bbci.co.uk/news/world/rss.xml", { headers: { accept: "application/rss+xml, application/xml, text/xml" } });
if (!response.ok) throw new Error(`RSS request failed: ${response.status}`);
const allSources = parseBbcWorldRss(await response.text());

async function create(category: "english" | "kanji") {
  const sources = selectStudyJournalSources(allSources, category, 0);
  const generation = await invokeLLM({
    model: "gemini-3-flash-preview",
    messages: [
      { role: "system", content: "You are a careful educational editor. Use only the supplied current-news candidates. Never fabricate events, sources, or publication times." },
      { role: "user", content: buildStudyJournalPrompt(category, "中学生", sources) },
    ],
    maxTokens: 6000,
    reasoningEffort: "low",
    outputSchema: {
      name: "study_journal",
      strict: true,
      schema: {
        type: "object",
        properties: {
          title: { type: "string" }, passage: { type: "string" }, translation: { type: "string" },
          annotations: { type: "array", items: { type: "object", properties: { kind: { type: "string", enum: ["word", "grammar", "kanji"] }, term: { type: "string" }, meaning: { type: "string" }, explanation: { type: "string" }, onyomi: { type: "string" }, kunyomi: { type: "string" } }, required: ["kind", "term", "meaning", "explanation", "onyomi", "kunyomi"], additionalProperties: false } },
          sources: { type: "array", items: { type: "object", properties: { title: { type: "string" }, url: { type: "string" }, publisher: { type: "string" }, publishedAt: { type: "string" } }, required: ["title", "url", "publisher", "publishedAt"], additionalProperties: false } },
        },
        required: ["title", "passage", "translation", "annotations", "sources"],
        additionalProperties: false,
      },
    },
  });
  const content = generation.choices[0]?.message.content;
  if (typeof content !== "string") throw new Error(`${category}: missing content`);
  const journal = normalizeStudyJournal(JSON.parse(content), category, "中学生");
  return { category, selectedTitle: sources[0]?.title, sourceTitle: journal.sources[0]?.title, title: journal.title };
}

console.log(JSON.stringify({ english: await create("english"), kanji: await create("kanji") }, null, 2));
