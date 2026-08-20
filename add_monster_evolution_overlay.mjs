import fs from 'node:fs';

const path = '/home/ubuntu/tonan-study/client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');
const functionStart = source.indexOf('function CalendarGardenPager(');
const functionEnd = source.indexOf('\nfunction PersonalSchedule', functionStart);
if (functionStart < 0 || functionEnd < 0) throw new Error('CalendarGardenPager bounds not found');
const section = source.slice(functionStart, functionEnd);
const closeMarker = '</Card></div>}</>;';
const closeIndex = section.lastIndexOf(closeMarker);
if (closeIndex < 0) throw new Error('CalendarGardenPager return end not found');
const overlay = [
  '<AnimatePresence>{evolvedStage !== null && <motion.div className="fixed inset-0 z-[70] flex items-center justify-center bg-emerald-950/45 p-5 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="モンスター進化">',
  '<motion.div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-emerald-100/70 bg-gradient-to-b from-amber-100 via-emerald-50 to-emerald-100 p-6 text-center text-emerald-950 shadow-2xl" initial={{ opacity: 0, scale: 0.9, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}>',
  '<motion.div aria-hidden="true" className="absolute inset-0 rounded-3xl border-4 border-amber-200/75" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: [0, 1, 0], scale: [0.7, 1.25, 1.55] }} transition={{ duration: 0.8, ease: "easeOut" }} />',
  '<motion.div className="relative mx-auto flex h-40 items-center justify-center" initial={{ scale: 0.74, rotate: -3 }} animate={{ scale: [0.74, 1.12, 1], rotate: [-3, 2, 0] }} transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}>{monster?.imageUrl ? <img src={monster.imageUrl} alt={`第{evolvedStage}段階へ進化したモンスター`} className="h-full max-w-full object-contain drop-shadow-xl" /> : <Sparkles className="h-24 w-24 text-emerald-500 drop-shadow-lg" />}</motion.div>',
  '<p className="relative mt-3 text-xs font-bold tracking-[0.25em] text-emerald-700">EVOLUTION</p><h2 className="relative mt-2 text-2xl font-bold">第{evolvedStage}段階へ進化！</h2><p className="relative mt-2 text-sm leading-6 text-emerald-800">学習を続けた成果で、モンスターが大きく成長しました。</p><Button className="relative mt-5 w-full bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => setEvolvedStage(null)}>育成の森へ</Button></motion.div></motion.div>}</AnimatePresence>',
].join('');
const updatedSection = section.slice(0, closeIndex + closeMarker.length) + overlay + section.slice(closeIndex + closeMarker.length);
source = source.slice(0, functionStart) + updatedSection + source.slice(functionEnd);
fs.writeFileSync(path, source);
