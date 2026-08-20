from pathlib import Path
p=Path('/home/ubuntu/tonan-study/client/src/pages/Home.tsx')
s=p.read_text()
s=s.replace('import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";','import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";\nimport { Checkbox } from "@/components/ui/checkbox";')
needle='function Pomodoro({ pin }: { pin: string }) {'
bar=r'''function readPomodoroState() {
  try { return JSON.parse(localStorage.getItem("tonan-pomodoro-v1") ?? "null") ?? {}; } catch { return {}; }
}

function PersistentTimerBar() {
  const [state, setState] = useState(() => readPomodoroState());
  const [, setTick] = useState(0);
  useEffect(() => {
    const sync = () => setState(readPomodoroState());
    window.addEventListener("tonan-pomodoro-update", sync);
    window.addEventListener("storage", sync);
    const timer = window.setInterval(() => { setState(readPomodoroState()); setTick(value => value + 1); }, 500);
    return () => { window.removeEventListener("tonan-pomodoro-update", sync); window.removeEventListener("storage", sync); window.clearInterval(timer); };
  }, []);
  const running = Boolean(state.persistent && state.running && state.endAt && state.endAt > Date.now());
  if (!running) return null;
  const seconds = Math.max(0, Math.ceil((state.endAt - Date.now()) / 1000));
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const update = (next: Record<string, unknown>) => { const current = readPomodoroState(); const value = { ...current, ...next }; localStorage.setItem("tonan-pomodoro-v1", JSON.stringify(value)); setState(value); window.dispatchEvent(new Event("tonan-pomodoro-update")); };
  return <div className="fixed inset-x-0 top-0 z-[60] h-8 border-b border-slate-700/80 bg-slate-950/95 px-3 text-white shadow-sm backdrop-blur" role="status" aria-label="継続中のタイマー"><div className="mx-auto flex h-full max-w-2xl items-center justify-between gap-2"><span className="truncate text-[10px] font-semibold text-slate-300">{state.focus ? "集中" : "休憩"} <span className="ml-1 font-mono text-xs text-white">{time}</span></span><div className="flex items-center gap-1"><Button type="button" size="sm" variant="ghost" className="h-6 px-2 text-[10px] text-white hover:bg-white/10 hover:text-white" onClick={() => update({ running: false, endAt: null })}>{state.running ? <Pause className="mr-1 h-3 w-3" /> : <Play className="mr-1 h-3 w-3" />}停止</Button><Button type="button" size="sm" variant="ghost" className="h-6 px-2 text-[10px] text-white hover:bg-white/10 hover:text-white" onClick={() => update({ running: true, endAt: Date.now() + (Number(state.seconds) || 25 * 60) * 1000 })}><Play className="mr-1 h-3 w-3" />開始</Button><Button type="button" size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/10 hover:text-white" aria-label="タイマーをリセット" onClick={() => update({ running: false, endAt: null, focus: true, seconds: 25 * 60 })}><TimerReset className="h-3 w-3" /></Button></div></div></div>;
}

'''
s=s.replace(needle,bar+needle,1)
s=s.replace('  const [endAt, setEndAt] = useState<number | null>(() => { try { const value = JSON.parse(localStorage.getItem("tonan-pomodoro-v1") ?? "null")?.endAt; return typeof value === "number" && value > Date.now() ? value : null; } catch { return null; } });','  const [endAt, setEndAt] = useState<number | null>(() => { try { const value = JSON.parse(localStorage.getItem("tonan-pomodoro-v1") ?? "null")?.endAt; return typeof value === "number" && value > Date.now() ? value : null; } catch { return null; } });\n  const [persistent, setPersistent] = useState(() => { try { return Boolean(JSON.parse(localStorage.getItem("tonan-pomodoro-v1") ?? "null")?.persistent); } catch { return false; } });')
s=s.replace('  const record = trpc.learning.recordTimer.useMutation();','  const record = trpc.learning.recordTimer.useMutation();\n  useEffect(() => { const sync = () => { const saved = readPomodoroState(); setSeconds(Number.isFinite(saved.seconds) ? saved.seconds : 25 * 60); setRunning(Boolean(saved.running && saved.endAt > Date.now())); setFocus(saved.focus !== false); setEndAt(typeof saved.endAt === "number" && saved.endAt > Date.now() ? saved.endAt : null); setPersistent(Boolean(saved.persistent)); }; window.addEventListener("tonan-pomodoro-update", sync); return () => window.removeEventListener("tonan-pomodoro-update", sync); }, []);',1)
s=s.replace('useEffect(() => { localStorage.setItem("tonan-pomodoro-v1", JSON.stringify({ seconds, running, focus, endAt })); }, [seconds, running, focus, endAt]);','useEffect(() => { localStorage.setItem("tonan-pomodoro-v1", JSON.stringify({ seconds, running, focus, endAt, persistent })); }, [seconds, running, focus, endAt, persistent]);',1)
s=s.replace('<p className="mt-1 text-xs text-slate-400">{focus ? "25分集中 + 5分休憩" : "気分をリセットしましょう"}</p></div><div className="flex gap-2">','<p className="mt-1 text-xs text-slate-400">{focus ? "25分集中 + 5分休憩" : "気分をリセットしましょう"}</p><label className="mt-2 flex items-center gap-2 text-[11px] text-slate-300"><Checkbox checked={persistent} onCheckedChange={value => setPersistent(value === true)} className="h-3.5 w-3.5 border-slate-500 data-[state=checked]:border-emerald-400 data-[state=checked]:bg-emerald-500" />他のタブでも表示し続ける</label></div><div className="flex gap-2">',1)
s=s.replace('return <div className="min-h-dvh bg-background text-foreground"><main', 'return <div className="min-h-dvh bg-background text-foreground"><PersistentTimerBar /><main',1)
p.write_text(s)
