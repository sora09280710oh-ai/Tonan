import fs from 'node:fs';

const path = '/home/ubuntu/tonan-study/client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');
const before = '<p className="text-center text-sm font-semibold">正解：{current.writingAnswer || current.front}</p><div className="grid grid-cols-2 gap-2"><Button variant="outline" disabled={!hasInk} onClick={() => score(false)}>不正解</Button><Button disabled={!hasInk} onClick={() => score(true)}>正解</Button></div></> : <Button className="w-full" disabled={aiGradingEnabled && gradeKanji.isPending} onClick={revealKanjiAnswer}>{aiGradingEnabled && gradeKanji.isPending ? "AIが採点中…" : "正解を確認する"}</Button>}'
const after = '<p className="text-center text-sm font-semibold">正解：{current.writingAnswer || current.front}</p>{aiGradingEnabled && aiGrade && aiGrade.status !== "ungradable" ? <Button className="w-full" onClick={() => score(aiGrade.status === "correct")}>次へ（AI採点：{aiGrade.status === "correct" ? "正解" : "不正解"}）</Button> : <div className="grid grid-cols-2 gap-2"><Button variant="outline" disabled={!hasInk} onClick={() => score(false)}>不正解</Button><Button disabled={!hasInk} onClick={() => score(true)}>正解</Button></div>}</> : <Button className="w-full" disabled={aiGradingEnabled && gradeKanji.isPending} onClick={revealKanjiAnswer}>{aiGradingEnabled && gradeKanji.isPending ? "AIが採点中…" : "正解を確認する"}</Button>}'

if (!source.includes(before)) throw new Error('AI grading decision controls not found');
source = source.replace(before, after);
fs.writeFileSync(path, source);
