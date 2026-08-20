import fs from 'node:fs';

const path = '/home/ubuntu/tonan-study/client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');
const marker = 'ADMINISTRATION</p><h1 className="mt-1 text-2xl font-bold">配信と編集</h1>';
const markerIndex = source.indexOf(marker);
if (markerIndex < 0) throw new Error('Admin header not found');
const start = source.lastIndexOf('<div className="pt-1">', markerIndex);
const end = source.indexOf('</div>', markerIndex) + '</div>'.length;
if (start < 0 || end < start) throw new Error('Admin header bounds not found');
const replacement = '<div className="flex items-start justify-between gap-3 pt-1"><div><p className="text-xs font-semibold tracking-wider text-primary">ADMINISTRATION</p><h1 className="mt-1 text-2xl font-bold">配信と編集</h1><p className="mt-1 text-sm text-muted-foreground">共有内容、標準単語帳、配信中テストを管理します。</p></div><Button size="sm" variant="outline" onClick={() => setAdminTab("monster")}>モンスター育成</Button></div>';
source = source.slice(0, start) + replacement + source.slice(end);
fs.writeFileSync(path, source);
