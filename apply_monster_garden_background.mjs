import fs from 'node:fs';

const path = '/home/ubuntu/tonan-study/client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');
const startMarker = '<Card className="h-full min-h-72 border-dashed border-emerald-500/45 bg-emerald-50/45 dark:bg-emerald-950/20">';
const start = source.indexOf(startMarker);
if (start < 0) throw new Error('Monster garden placeholder start not found');
const end = source.indexOf('</Card></div></motion.div>', start);
if (end < 0) throw new Error('Monster garden placeholder end not found');
const replacement = '<Card className="relative h-full min-h-72 overflow-hidden border-emerald-900/35 bg-emerald-950 shadow-inner"><div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/manus-storage/monster-garden-forest_5f851e7e.png)" }} /><div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-emerald-950/75 via-emerald-900/10 to-amber-50/10" /><CardContent className="relative flex h-full min-h-72 flex-col items-center justify-end p-4 text-center"><div className="w-full rounded-2xl border border-white/35 bg-emerald-950/60 p-4 text-white shadow-lg backdrop-blur-sm"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/45 bg-white/15"><Sprout className="h-6 w-6 text-emerald-200" /></div><Badge variant="outline" className="mt-3 border-emerald-100/60 bg-emerald-950/35 text-emerald-50">育成の森</Badge><p className="mt-2 font-semibold">モンスター育成エリア</p><p className="mt-1 text-xs leading-5 text-emerald-50/85">ここで学習の積み重ねとともに、モンスターが育っていきます。</p></div></CardContent></Card>';
source = source.slice(0, start) + replacement + source.slice(end + '</Card>'.length);
fs.writeFileSync(path, source);
