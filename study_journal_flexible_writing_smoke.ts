import { generateCompleteStudyJournal, parseBbcWorldRss, parseMainichiRss, selectStudyJournalSources } from "/home/ubuntu/tonan-study/server/studyJournal.ts";

async function sourceFor(category: "english" | "kanji") {
  const url = category === "english" ? "https://www3.nhk.or.jp/nhkworld/data/en/news/backstory/rss.xml" : "https://mainichi.jp/rss/etc/mai/today.rss";
  const response = await fetch(url, { headers: { accept: "application/rss+xml, application/xml, text/xml" } });
  if (!response.ok) throw new Error(`${category} RSS failed: ${response.status}`);
  const parsed = category === "english" ? parseBbcWorldRss(await response.text()).map(source => ({ ...source, publisher: "NHK WORLD-JAPAN News" })) : parseMainichiRss(await response.text());
  return selectStudyJournalSources(parsed);
}

async function main() {
  const english = await generateCompleteStudyJournal("english", "高校1年生", await sourceFor("english"), "english smoke timed out");
  const kanji = await generateCompleteStudyJournal("kanji", "高校1年生", await sourceFor("kanji"), "kanji smoke timed out");
  const metrics = {
    english: {
      total: english.questions.length,
      choice: english.questions.filter(question => question.kind === "choice").length,
      writing: english.questions.filter(question => question.kind === "writing").length,
      task: english.questions.find(question => question.kind === "writing")?.writingTask,
    },
    kanji: {
      total: kanji.questions.length,
      choice: kanji.questions.filter(question => question.kind === "choice").length,
      writing: kanji.questions.filter(question => question.kind === "writing").length,
      task: kanji.questions.find(question => question.kind === "writing")?.writingTask,
    },
  };
  if (metrics.english.total !== 5 || metrics.english.choice !== 4 || metrics.english.writing !== 1 || !metrics.english.task || metrics.english.task.unit !== "words" || metrics.english.task.mode === "none") throw new Error(`Unexpected English structure: ${JSON.stringify(metrics.english)}`);
  if (metrics.kanji.total !== 6 || metrics.kanji.choice !== 5 || metrics.kanji.writing !== 1 || !metrics.kanji.task || metrics.kanji.task.unit !== "characters" || metrics.kanji.task.mode === "none") throw new Error(`Unexpected Kanji structure: ${JSON.stringify(metrics.kanji)}`);
  console.log(JSON.stringify(metrics));
}

void main();
