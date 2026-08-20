import fs from 'node:fs';

const path = '/home/ubuntu/tonan-study/client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');

const resultsMarker = '  if (mode === "results") {';
const rewritePanel = `  if (mode === "results" && rewriteEntry) return <Card className="border-violet-200 dark:border-violet-900"><CardHeader><CardTitle>書き直し練習</CardTitle><CardDescription>「${"{rewriteEntry.writingAnswer || rewriteEntry.front}"}」をもう一度書き、同じAI採点基準で確認します。</CardDescription></CardHeader><CardContent className="space-y-4"><div className="rounded-xl bg-muted/60 p-3 text-center"><p className="text-xs text-muted-foreground">目標の漢字</p><p className="mt-1 text-4xl font-bold">{rewriteEntry.writingAnswer || rewriteEntry.front}</p><p className="mt-2 text-xs text-muted-foreground">採点の厳しさ：{aiGradingStrictness === "strict" ? "厳しめ" : "標準"}</p></div><HandwritingPad onChange={hasInk => { setRewriteHasInk(hasInk); if (!hasInk) setRewriteGrade(null); }} onImageChange={image => { setRewriteImage(image); if (image) setRewriteGrade(null); }} />{rewriteGrade && <div className={cn("rounded-xl border p-3 text-sm", rewriteGrade.status === "correct" ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100" : rewriteGrade.status === "ungradable" ? "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100" : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-100")}><p className="font-semibold">AI再採点：{rewriteGrade.status === "correct" ? "正解" : rewriteGrade.status === "incorrect" ? "不正解" : "採点不可"}</p><p className="mt-1 text-xs leading-5">{rewriteGrade.summary}</p>{rewriteGrade.issues.length > 0 && <ul className="mt-3 space-y-1 text-xs leading-5">{rewriteGrade.issues.map((issue, issueIndex) => <li key={issueIndex}>○ {issue.description}</li>)}</ul>}</div>}<div className="grid grid-cols-2 gap-2"><Button variant="outline" onClick={() => setRewriteEntry(null)}>結果へ戻る</Button><Button disabled={!rewriteHasInk || gradeRewrite.isPending} onClick={gradeRewriteAnswer}>{gradeRewrite.isPending ? "AIが再採点中…" : "AIで再採点"}</Button></div></CardContent></Card>;
`;
if (!source.includes(resultsMarker)) throw new Error('Results marker not found');
source = source.replace(resultsMarker, rewritePanel + resultsMarker);

const summaryMarker = '<p className="mt-1 text-xs leading-5 text-muted-foreground">{grade.summary}</p>';
const rewriteButton = '<p className="mt-1 text-xs leading-5 text-muted-foreground">{grade.summary}</p><Button size="sm" variant="outline" className="mt-3 w-full" onClick={() => startRewrite(result.entry)}>書き直し練習</Button>';
if (!source.includes(summaryMarker)) throw new Error('Feedback summary marker not found');
source = source.replace(summaryMarker, rewriteButton);

fs.writeFileSync(path, source);
