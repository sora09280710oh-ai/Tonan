import fs from 'node:fs';

const path = '/home/ubuntu/tonan-study/client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');
const rewriteNeedle = '<HandwritingPad onChange={hasInk => { setRewriteHasInk(hasInk); if (!hasInk) setRewriteGrade(null); }} onImageChange={image => { setRewriteImage(image); if (image) setRewriteGrade(null); }} />';
const mainNeedle = '<HandwritingPad onChange={setHasInk} onImageChange={setHandwritingImage} />';

if (!source.includes(rewriteNeedle)) throw new Error('Rewrite handwriting pad not found');
if (!source.includes(mainNeedle)) throw new Error('Test handwriting pad not found');

source = source.replace(rewriteNeedle, '<HandwritingPad expectedText={rewriteEntry.writingAnswer || rewriteEntry.front} onChange={hasInk => { setRewriteHasInk(hasInk); if (!hasInk) setRewriteGrade(null); }} onImageChange={image => { setRewriteImage(image); if (image) setRewriteGrade(null); }} />');
source = source.replace(mainNeedle, '<HandwritingPad expectedText={current.writingAnswer || current.front} onChange={setHasInk} onImageChange={setHandwritingImage} />');
fs.writeFileSync(path, source);
