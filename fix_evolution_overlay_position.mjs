import fs from 'node:fs';

const path = '/home/ubuntu/tonan-study/client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');
const functionStart = source.indexOf('function CalendarGardenPager(');
const functionEnd = source.indexOf('\nfunction PersonalSchedule', functionStart);
if (functionStart < 0 || functionEnd < 0) throw new Error('CalendarGardenPager bounds not found');
const section = source.slice(functionStart, functionEnd);
const overlayStart = section.indexOf('<AnimatePresence>{evolvedStage !== null');
if (overlayStart < 0) throw new Error('Evolution overlay not found');
const base = section.slice(0, overlayStart);
const overlay = section.slice(overlayStart);
if (!base.endsWith('</>;')) throw new Error('CalendarGardenPager closing fragment not found');
const updatedSection = `${base.slice(0, -4)}${overlay}</>;`;
source = source.slice(0, functionStart) + updatedSection + source.slice(functionEnd);
fs.writeFileSync(path, source);
