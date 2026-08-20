from pathlib import Path
p=Path('/home/ubuntu/tonan-study/client/src/pages/Home.tsx')
s=p.read_text()
start=s.index('function Pomodoro')
end=s.index('\nfunction HomePage', start)
new=r'''function Pomodoro({ pin }: { pin: string }) {
  const [seconds, setSeconds] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem("tonan-pomodoro-v1") ?? "null"); if (saved?.running && saved.endAt) return Math.max(0, Math.ceil((saved.endAt - Date.now()) / 1000)); return Number.isFinite(saved?.seconds) ? saved.seconds : 25 * 60; } catch { return 25 * 60; }
  });
  const [running, setRunning] = useState(() => { try { const saved = JSON.parse(localStorage.getItem("tonan-pomodoro-v1") ?? "null"); return Boolean(saved?.running && saved.endAt > Date.now()); } catch { return false; } });
  const [focus, setFocus] = useState(() => { try { return JSON.parse(localStorage.getItem("tonan-pomodoro-v1") ?? "null")?.focus !== false; } catch { return true; } });
  const [endAt, setEndAt] = useState<number | null>(() => { try { const value = JSON.parse(localStorage.getItem("tonan-pomodoro-v1") ?? "null")?.endAt; return typeof value === "number" && value > Date.now() ? value : null; } catch { return null; } });
  const record = trpc.learning.recordTimer.useMutation();
  useEffect(() => {
    if (!running || !endAt) return;
    const tick = () => { const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000)); setSeconds(remaining); if (remaining === 0) setRunning(false); };
    tick(); const timer = window.setInterval(tick, 500); return () => window.clearInterval(timer);
  }, [running, endAt]);
  useEffect(() => { localStorage.setItem("tonan-pomodoro-v1", JSON.stringify({ seconds, running, focus, endAt })); }, [seconds, running, focus, endAt]);
  useEffect(() => {
    if (seconds !== 0) return;
    setRunning(false); setEndAt(null);
    if (focus) { record.mutate({ pin, seconds: 25 * 60 }); toast.success("集中時間を記録しました。5分休憩しましょう。"); setFocus(false); setSeconds(5 * 60); }
    else { toast.success("休憩終了。もう一度集中しましょう。"); setFocus(true); setSeconds(25 * 60); }
  }, [seconds, focus, pin]);
  const toggleRunning = () => { if (running) { setRunning(false); setEndAt(null); } else { const nextEndAt = Date.now() + seconds * 1000; setEndAt(nextEndAt); setRunning(true); } };
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const rest = String(seconds % 60).padStart(2, "0");
  return <Card className="overflow-hidden border-0 bg-slate-900 text-white shadow-lg"><CardContent className="flex items-center justify-between p-5"><div><div className="mb-1 flex items-center gap-2 text-xs text-slate-300"><AlarmClock className="h-4 w-4 text-amber-300" />{focus ? "集中タイム" : "休憩タイム"}</div><p className="font-mono text-4xl font-semibold tracking-tight">{minutes}:{rest}</p><p className="mt-1 text-xs text-slate-400">{focus ? "25分集中 + 5分休憩" : "気分をリセットしましょう"}</p></div><div className="flex gap-2"><Button size="icon" className="rounded-full bg-white text-slate-950 hover:bg-slate-200" onClick={toggleRunning}>{running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button><Button size="icon" variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10" onClick={() => { setRunning(false); setEndAt(null); setFocus(true); setSeconds(25 * 60); }}><TimerReset className="h-4 w-4" /></Button></div></CardContent></Card>;
}'''
s=s[:start]+new+s[end:]
s=s.replace('const touchStart = useRef<number | null>(null);\n  const current', 'const touchStart = useRef<number | null>(null);\n  const suppressClick = useRef(false);\n  const [swipeOffset, setSwipeOffset] = useState(0);\n  const current',1)
s=s.replace('<p className="mt-4 text-center text-3xl font-bold">{nextPracticeEntry.front}</p>','',1)
s=s.replace('animate={{ x: 0, opacity: 1, rotateY: 0 }}', 'animate={{ x: swipeOffset, opacity: 1, rotateY: 0 }}',1)
old='onTouchStart={event => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={event => { const start = touchStart.current; const end = event.changedTouches[0]?.clientX; if (start && end && Math.abs(end - start) > 50) { const direction = end > start ? "right" : "left"; setSwipeDirection(direction); window.setTimeout(() => score(direction === "right"), animations ? 180 : 0); } }} onClick={() => setFlipped(value => !value)}'
newhandlers='onTouchStart={event => { touchStart.current = event.touches[0]?.clientX ?? null; setSwipeOffset(0); }} onTouchMove={event => { const start = touchStart.current; const currentX = event.touches[0]?.clientX; if (start !== null && currentX !== undefined) setSwipeOffset(currentX - start); }} onTouchEnd={event => { const start = touchStart.current; const end = event.changedTouches[0]?.clientX; const delta = start !== null && end !== undefined ? end - start : 0; touchStart.current = null; if (Math.abs(delta) > 50) { const direction = delta > 0 ? "right" : "left"; setSwipeDirection(direction); suppressClick.current = true; window.setTimeout(() => { suppressClick.current = false; score(direction === "right"); }, animations ? 180 : 0); } else setSwipeOffset(0); }} onClick={() => { if (suppressClick.current || Math.abs(swipeOffset) > 10) return; setFlipped(value => !value); }}'
if old not in s: raise SystemExit('swipe handler pattern not found')
s=s.replace(old,newhandlers,1)
p.write_text(s)
