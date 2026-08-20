import fs from 'node:fs';

const path = '/home/ubuntu/tonan-study/client/src/pages/Home.tsx';
const source = fs.readFileSync(path, 'utf8');
const updated = source.replace('alt={`第{evolvedStage}段階へ進化したモンスター`}', 'alt={`第${evolvedStage}段階へ進化したモンスター`}');
if (updated === source) throw new Error('Evolution alt text not found');
fs.writeFileSync(path, updated);
