import { generateCompleteStudyJournal, parseBbcWorldRss, selectStudyJournalSources } from "/home/ubuntu/tonan-study/server/studyJournal.ts";

async function main() {
  const response = await fetch("https://www3.nhk.or.jp/nhkworld/data/en/news/backstory/rss.xml", {
    headers: { accept: "application/rss+xml, application/xml, text/xml" },
  });
  if (!response.ok) throw new Error(`NHK WORLD RSS failed: ${response.status}`);

  const sources = selectStudyJournalSources(parseBbcWorldRss(await response.text()).map(source => ({ ...source, publisher: "NHK WORLD-JAPAN News" })));
  const journal = await generateCompleteStudyJournal("english", "高校1年生", sources, "smoke test timed out");
  const metrics = {
    title: journal.title,
    passageLength: journal.passage.length,
    questions: journal.questions.length,
    choice: journal.questions.filter(question => question.kind === "choice").length,
    writing: journal.questions.filter(question => question.kind === "writing").length,
    comprehension: journal.questions.filter(question => question.focus === "comprehension").length,
    vocabulary: journal.questions.filter(question => question.focus === "vocabulary").length,
    summary: journal.questions.filter(question => question.focus === "summary").length,
  };
  if (metrics.questions !== 5 || metrics.choice !== 4 || metrics.writing !== 1 || metrics.comprehension !== 3 || metrics.vocabulary !== 1 || metrics.summary !== 1) throw new Error(`Unexpected generated journal: ${JSON.stringify(metrics)}`);
  console.log(JSON.stringify(metrics));
}

void main();
