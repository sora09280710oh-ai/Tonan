import fs from 'node:fs';

const path = '/home/ubuntu/tonan-study/client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');
const rewriteNeedle = '<HandwritingPad expectedText={rewriteEntry.writingAnswer || rewriteEntry.front} onChange=';
const mainNeedle = '<HandwritingPad expectedText={current.writingAnswer || current.front} onChange=';

if (!source.includes(rewriteNeedle)) throw new Error('Rewrite handwriting pad not found');
if (!source.includes(mainNeedle)) throw new Error('Test handwriting pad not found');

source = source.replace(rewriteNeedle, '<HandwritingPad expectedText={rewriteEntry.writingAnswer || rewriteEntry.front} resetKey={rewriteEntry.id} onChange=');
source = source.replace(mainNeedle, '<HandwritingPad expectedText={current.writingAnswer || current.front} resetKey={current.id} onChange=');
fs.writeFileSync(path, source);
