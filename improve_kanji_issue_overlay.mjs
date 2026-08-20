import fs from 'node:fs';

const path = '/home/ubuntu/tonan-study/client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');

const markerNeedle = '<span key={issueIndex} aria-label={issue.description} className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl font-bold leading-none text-rose-600 drop-shadow" style={{ left: `${issue.x}%`, top: `${issue.y}%` }}>○</span>';
const markerReplacement = '<span key={issueIndex} aria-label={`${issueIndex + 1}. ${aiIssueLabel[issue.kind]}：${issue.description}`} className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-rose-600 bg-white/90 text-xs font-bold text-rose-700 shadow-md ring-2 ring-white/80" style={{ left: `${issue.x}%`, top: `${issue.y}%` }}><span className="absolute -inset-1 flex items-center justify-center text-4xl font-normal leading-none text-rose-600">○</span><span className="relative">{issueIndex + 1}</span></span>';
const resultListNeedle = '<ul className="mt-3 space-y-1 text-xs leading-5 text-muted-foreground">{grade.issues.map((issue, issueIndex) => <li key={issueIndex}>○ {issue.description}</li>)}</ul>';
const resultListReplacement = '<div className="mt-3 space-y-2">{grade.issues.map((issue, issueIndex) => <div key={issueIndex} className="flex gap-2 rounded-lg border border-rose-100 bg-rose-50/70 p-2 text-xs leading-5 text-rose-950 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-100"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-rose-500 bg-white text-[10px] font-bold text-rose-700 dark:bg-slate-950">{issueIndex + 1}</span><p><span className="font-semibold">ここ：{aiIssueLabel[issue.kind]}</span> — {issue.description}</p></div>)}</div>';
const rewriteListNeedle = '<ul className="mt-3 space-y-1 text-xs leading-5">{rewriteGrade.issues.map((issue, issueIndex) => <li key={issueIndex}>○ {issue.description}</li>)}</ul>';
const rewriteListReplacement = '<div className="mt-3 space-y-2">{rewriteGrade.issues.map((issue, issueIndex) => <div key={issueIndex} className="flex gap-2 rounded-lg bg-white/60 p-2 text-xs leading-5"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current bg-white text-[10px] font-bold">{issueIndex + 1}</span><p><span className="font-semibold">ここ：{aiIssueLabel[issue.kind]}</span> — {issue.description}</p></div>)}</div>';

for (const [needle, replacement, name] of [
  [markerNeedle, markerReplacement, 'image markers'],
  [resultListNeedle, resultListReplacement, 'result issue list'],
  [rewriteListNeedle, rewriteListReplacement, 'rewrite issue list'],
]) {
  if (!source.includes(needle)) throw new Error(`${name} not found`);
  source = source.replace(needle, replacement);
}

fs.writeFileSync(path, source);
