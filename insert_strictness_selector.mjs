import fs from 'node:fs';

const path = '/home/ubuntu/tonan-study/client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');
const labelStart = source.indexOf('AIによる採点');
if (labelStart < 0) throw new Error('AI grading label not found');
const labelEnd = source.indexOf('</label>}', labelStart);
if (labelEnd < 0) throw new Error('AI grading label end not found');
const insertion = '{!isPractice && category === "kanji" && aiGradingEnabled && <div><Label>AI採点の厳しさ</Label><Select value={aiGradingStrictness} onValueChange={value => setAiGradingStrictness(value as "standard" | "strict")}><SelectTrigger className="mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="standard">標準（学習段階として読める形を重視）</SelectItem><SelectItem value="strict">厳しめ（細かな形・とめ・はね・はらいまで確認）</SelectItem></SelectContent></Select></div>}';
source = source.slice(0, labelEnd + '</label>}'.length) + insertion + source.slice(labelEnd + '</label>}'.length);
fs.writeFileSync(path, source);
