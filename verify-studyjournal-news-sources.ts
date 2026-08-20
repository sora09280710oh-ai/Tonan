import { invokeLLM } from "../server/_core/llm";
import { buildStudyJournalPrompt, normalizeStudyJournal, parseBbcWorldRss, parseMainichiRss, selectStudyJournalSources } from "../server/studyJournal";

const journalSchema = {
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
};

async function fetchSources(category: "english" | "kanji") {
  const url = category === "english" ? "https://www3.nhk.or.jp/nhkworld/data/en/news/backstory/rss.xml" : "https://mainichi.jp/rss/etc/mai/today.rss";
  const response = await fetch(url, { headers: { accept: "application/rss+xml, application/xml, text/xml" } });
  if (!response.ok) throw new Error(`${category}: RSS request failed`);
  return category === "english" ? parseBbcWorldRss(await response.text()).map(source => ({ ...source, publisher: "NHK WORLD-JAPAN News" })) : parseMainichiRss(await response.text());
}

async function create(category: "english" | "kanji") {
  const sources = selectStudyJournalSources(await fetchSources(category));
  const result = await invokeLLM({
    model: "gemini-3-flash-preview",
    messages: [
      { role: "system", content: "You are a careful educational editor. Use only the supplied current-news candidate. Never fabricate events, sources, or publication times." },
      { role: "user", content: buildStudyJournalPrompt(category, "中学生", sources) },
    ],
    maxTokens: 6000,
    reasoningEffort: "low",
    outputSchema: journalSchema,
  });
  const content = result.choices[0]?.message.content;
  if (typeof content !== "string") throw new Error(`${category}: missing content`);
  const journal = normalizeStudyJournal(JSON.parse(content), category, "中学生");
  return { category, selectedTitle: sources[0]?.title, sourceTitle: journal.sources[0]?.title, sourcePublisher: journal.sources[0]?.publisher, articleTitle: journal.title };
}

console.log(JSON.stringify({ english: await create("english"), kanji: await create("kanji") }, null, 2));
