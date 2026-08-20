import { trpc } from "@/lib/trpc";
import { ArrowRight, BookOpenCheck, BrainCircuit, Check, ChevronDown, CirclePlay, Compass, LockKeyhole, Mail, Newspaper, Orbit, ShieldCheck, Sparkles, TimerReset } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "wouter";
import "../marketing.css";

const ICON_URL = "/manus-storage/IMG_0856_ab3fdaa7.jpeg";

const features = [
  { icon: BookOpenCheck, eyebrow: "WORDS", title: "単語を、理解した記憶に。", text: "英単語と漢字を、自分の単語帳・カード・テストで反復。覚え方に合わせて練習方法を選べます。" },
  { icon: BrainCircuit, eyebrow: "RECALL", title: "忘れそうな頃に、もう一度。", text: "復習予定を見える化し、今取り組むべき単語へすぐ進めます。学習の迷いを減らします。" },
  { icon: Newspaper, eyebrow: "JOURNAL", title: "世界を読み、言葉を使う。", text: "記事を教材にしたStudyJournal。読解問題と筆記で、語彙だけではない力を確かめます。" },
  { icon: Sparkles, eyebrow: "RHYTHM", title: "続けた時間が、育ちになる。", text: "カレンダー、ミッション、学習記録で小さな積み重ねを残し、毎日の学びを続けやすくします。" },
];

const steps = [
  { number: "01", icon: Compass, title: "PINコードで始める", text: "4桁のPINコードで、自分だけの学習記録を作ります。" },
  { number: "02", icon: CirclePlay, title: "今日の学習を選ぶ", text: "単語カード、テスト、StudyJournalから、今の気分と目的に合う学習を始めます。" },
  { number: "03", icon: TimerReset, title: "積み重ねを振り返る", text: "カレンダーと記録で、できたことと次に取り組むことを確かめます。" },
];

function StarField() {
  return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {Array.from({ length: 24 }, (_, index) => <i key={index} className="sv-star" style={{ left: `${(index * 37) % 100}%`, top: `${(index * 53) % 88}%`, animationDelay: `${(index % 8) * 0.38}s` }} />)}
    <div className="sv-nebula sv-nebula-one" /><div className="sv-nebula sv-nebula-two" />
  </div>;
}

export default function MarketingSite() {
  const [form, setForm] = useState({ name: "", email: "", organization: "", role: "", message: "" });
  const application = trpc.marketing.submitApplication.useMutation({
    onSuccess: () => setForm({ name: "", email: "", organization: "", role: "", message: "" }),
  });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    application.mutate(form);
  };

  return <main className="sv-marketing min-h-screen overflow-x-hidden bg-[#020617] text-slate-100 selection:bg-cyan-300/30">
    <section className="relative isolate overflow-hidden border-b border-white/8">
      <StarField />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 lg:px-10">
        <nav className="flex items-center justify-between gap-4" aria-label="紹介サイトのナビゲーション">
          <Link href="/" className="flex items-center gap-2.5"><img src={ICON_URL} alt="StudyVerse" className="h-9 w-9 rounded-xl border border-white/20 object-cover shadow-lg shadow-cyan-400/15" /><span className="font-semibold tracking-tight text-white">StudyVerse</span></Link>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex"><a href="#features" className="transition hover:text-white">できること</a><a href="#how" className="transition hover:text-white">使い方</a><a href="#apply" className="transition hover:text-white">利用を検討する</a></div>
          <Link href="/app" className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/14">アプリを開く</Link>
        </nav>

        <div className="grid items-center gap-12 pb-4 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:pt-24">
          <div className="relative z-10">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/8 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-cyan-100"><Orbit className="h-3.5 w-3.5" /> LEARN IN YOUR ORBIT</p>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">学びの軌道を、<br /><span className="sv-gradient-text">自分のペースで。</span></h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-slate-300 sm:text-lg">StudyVerseは、英単語・漢字・記事読解をひとつの学習リズムにまとめるモバイル学習アプリです。今日やることが分かり、学んだ時間が残ります。</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/app" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3.5 font-semibold text-slate-950 shadow-xl shadow-cyan-300/20 transition hover:-translate-y-0.5 hover:bg-cyan-200">学習を始める <ArrowRight className="h-4 w-4" /></Link><a href="#apply" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/14 bg-white/6 px-5 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">利用について相談する</a></div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400"><span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-cyan-300" />4桁PINで記録を保持</span><span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-cyan-300" />スマホ・タブレット対応</span></div>
          </div>

          <div className="relative mx-auto w-full max-w-[470px] pb-4">
            <div className="sv-orbit sv-orbit-a" /><div className="sv-orbit sv-orbit-b" />
            <div className="relative rounded-[2.25rem] border border-white/15 bg-slate-950/75 p-3 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl">
              <div className="overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#091327]">
                <div className="flex items-center justify-between border-b border-white/8 px-5 py-4"><div className="flex items-center gap-2"><img src={ICON_URL} alt="" className="h-7 w-7 rounded-lg object-cover" /><span className="text-sm font-semibold">StudyVerse</span></div><div className="h-7 w-7 rounded-full bg-cyan-300/15" /></div>
                <div className="space-y-4 p-5"><div className="rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/12 to-violet-400/8 p-4"><p className="text-xs font-semibold tracking-wider text-cyan-200">TODAY'S ORBIT</p><p className="mt-2 text-xl font-semibold">今日の学びを、ひとつずつ。</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[62%] rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" /></div></div><div className="grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/8 bg-white/5 p-3"><p className="text-[11px] text-slate-400">復習予定</p><p className="mt-1 text-lg font-semibold text-white">12 <span className="text-xs font-normal text-slate-400">語</span></p></div><div className="rounded-xl border border-white/8 bg-white/5 p-3"><p className="text-[11px] text-slate-400">学習ストリーク</p><p className="mt-1 text-lg font-semibold text-white">7 <span className="text-xs font-normal text-slate-400">日</span></p></div></div><div className="rounded-xl border border-violet-300/15 bg-violet-300/7 p-3"><div className="flex items-center justify-between"><p className="text-sm font-medium">StudyJournal</p><span className="text-xs text-violet-200">記事から学ぶ</span></div><p className="mt-1 text-xs leading-5 text-slate-400">読む・答える・書き直す。英語と漢字の読解を今日の教材に。</p></div></div>
              </div>
            </div>
            <div className="absolute -bottom-1 -left-7 rounded-2xl border border-white/12 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur"><p className="text-[11px] text-slate-400">LEARNING LOG</p><p className="mt-1 text-sm font-semibold text-cyan-100">積み重ねが見える。</p></div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-b border-white/8 bg-white/[0.025] py-5"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-9 gap-y-2 px-5 text-center text-xs font-medium tracking-[0.08em] text-slate-400 sm:text-sm"><span>ENGLISH &amp; KANJI</span><span className="hidden h-1 w-1 rounded-full bg-cyan-300/60 sm:block" /><span>SPACED REVIEW</span><span className="hidden h-1 w-1 rounded-full bg-cyan-300/60 sm:block" /><span>STUDYJOURNAL</span><span className="hidden h-1 w-1 rounded-full bg-cyan-300/60 sm:block" /><span>YOUR LEARNING LOG</span></div></section>

    <section id="features" className="scroll-mt-8 px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto max-w-6xl"><div className="max-w-2xl"><p className="text-xs font-semibold tracking-[0.16em] text-cyan-300">WHAT STUDYVERSE DOES</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">知識をためるだけで終わらせない。<br />使える学びへつなげる。</h2><p className="mt-5 leading-8 text-slate-400">単語を覚えること、読んで理解すること、振り返って続けること。それぞれを別々にしないための機能をそろえました。</p></div><div className="mt-12 grid gap-4 md:grid-cols-2">{features.map((feature, index) => { const Icon = feature.icon; return <article key={feature.eyebrow} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/55 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-slate-900/80 sm:p-7"><div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-300/7 blur-2xl transition group-hover:bg-cyan-300/12" /><div className="relative"><div className="flex items-center justify-between"><div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-100/15 bg-cyan-300/10 text-cyan-200"><Icon className="h-5 w-5" /></div><span className="text-[11px] font-semibold tracking-[0.16em] text-slate-500">{feature.eyebrow}</span></div><h3 className="mt-7 text-xl font-semibold tracking-[-0.025em] text-white">{feature.title}</h3><p className="mt-3 max-w-md text-sm leading-7 text-slate-400">{feature.text}</p></div><span className="absolute bottom-4 right-5 text-5xl font-semibold text-white/[0.035]">0{index + 1}</span></article>; })}</div></div></section>

    <section id="how" className="scroll-mt-8 border-y border-white/8 bg-[#071225] px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><p className="text-xs font-semibold tracking-[0.16em] text-cyan-300">HOW TO START</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">使い方は、<br />シンプルです。</h2><p className="mt-5 max-w-md leading-8 text-slate-400">たくさんの機能があっても、始めるときに迷わせない。StudyVerseは「今日は何をするか」から静かに導きます。</p><Link href="/app" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100">アプリ画面を開く <ArrowRight className="h-4 w-4" /></Link></div><div className="space-y-3">{steps.map(step => { const Icon = step.icon; return <div key={step.number} className="group flex gap-5 rounded-2xl border border-white/8 bg-white/[0.025] p-5 transition hover:border-white/16 hover:bg-white/[0.045]"><p className="pt-1 text-sm font-semibold text-cyan-300">{step.number}</p><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/7 text-slate-200"><Icon className="h-5 w-5" /></div><div><h3 className="font-semibold text-white">{step.title}</h3><p className="mt-1.5 text-sm leading-6 text-slate-400">{step.text}</p></div></div>; })}</div></div></section>

    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1.05fr_.95fr]"><div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-[#0b1530] p-7 sm:p-9"><p className="text-xs font-semibold tracking-[0.16em] text-violet-300">STUDYJOURNAL</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">言葉を、<br />現実の文脈で学ぶ。</h2><p className="mt-5 max-w-lg leading-8 text-slate-400">英語・漢字の記事を読み、選択問題と筆記に取り組みます。筆記では本文の根拠や表現、指定された文字数・語数まで確認し、改善のための書き直し例を表示します。</p><div className="mt-8 flex flex-wrap gap-2">{["内容理解", "本文根拠", "筆記フィードバック", "書き直し例"].map(item => <span key={item} className="rounded-full border border-violet-200/15 bg-violet-300/8 px-3 py-1.5 text-xs text-violet-100">{item}</span>)}</div></div><div className="rounded-3xl border border-cyan-200/12 bg-cyan-300/[0.055] p-7 sm:p-9"><ShieldCheck className="h-7 w-7 text-cyan-200" /><h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em] text-white">一人ひとりの学習を、<br />一人ひとりの記録に。</h3><p className="mt-4 leading-8 text-slate-400">PINコードごとに学習記録を分けて保存します。自分の単語帳、復習の予定、日々の積み重ねを、自分のペースで育てられます。</p><div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100"><LockKeyhole className="h-4 w-4" />PINコードで始められる設計</div></div></div></section>

    <section id="apply" className="scroll-mt-6 px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10"><div className="sv-apply mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-cyan-200/18 p-6 sm:p-10 lg:p-12"><div className="relative grid gap-10 lg:grid-cols-[.86fr_1.14fr]"><div><p className="text-xs font-semibold tracking-[0.16em] text-cyan-100">LET'S TALK</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">StudyVerseを、<br />使ってみたい方へ。</h2><p className="mt-5 max-w-md leading-8 text-slate-200/75">個人での利用、学校・教室・学習支援での活用など、目的に合わせてご相談いただけます。内容を確認後、連絡先へご案内します。</p><div className="mt-8 flex items-center gap-3 text-sm text-cyan-50"><div className="grid h-9 w-9 place-items-center rounded-xl border border-white/14 bg-white/8"><Mail className="h-4 w-4" /></div>利用についての申込み・相談フォーム</div></div><form onSubmit={submit} className="rounded-2xl border border-white/12 bg-slate-950/45 p-5 backdrop-blur sm:p-6"><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium text-slate-100">お名前<span className="ml-1 text-cyan-200">*</span><input required value={form.name} onChange={event => setForm(current => ({ ...current, name: event.target.value }))} className="sv-input" autoComplete="name" /></label><label className="block text-sm font-medium text-slate-100">メールアドレス<span className="ml-1 text-cyan-200">*</span><input required type="email" value={form.email} onChange={event => setForm(current => ({ ...current, email: event.target.value }))} className="sv-input" autoComplete="email" /></label></div><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium text-slate-100">学校・組織名（任意）<input value={form.organization} onChange={event => setForm(current => ({ ...current, organization: event.target.value }))} className="sv-input" autoComplete="organization" /></label><label className="block text-sm font-medium text-slate-100">立場・役割（任意）<input value={form.role} onChange={event => setForm(current => ({ ...current, role: event.target.value }))} className="sv-input" placeholder="例：生徒・保護者・先生" /></label></div><label className="mt-4 block text-sm font-medium text-slate-100">利用目的・ご相談内容（任意）<textarea value={form.message} onChange={event => setForm(current => ({ ...current, message: event.target.value }))} className="sv-input min-h-28 resize-y" placeholder="利用を考えている理由や、知りたいことを入力してください。" /></label>{application.isSuccess && <p role="status" className="mt-4 rounded-xl border border-emerald-300/25 bg-emerald-300/10 px-3 py-2.5 text-sm text-emerald-100">申込みを受け付けました。ご入力いただいた連絡先へご案内します。</p>}{application.isError && <p role="alert" className="mt-4 rounded-xl border border-rose-300/25 bg-rose-300/10 px-3 py-2.5 text-sm text-rose-100">{application.error.message}</p>}<button type="submit" disabled={application.isPending} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">{application.isPending ? "送信しています…" : "申込みを送信する"}<ArrowRight className="h-4 w-4" /></button><p className="mt-3 text-xs leading-5 text-slate-400">送信前に、<Link href="/terms" className="underline decoration-slate-500 underline-offset-2 hover:text-white">利用規約・プライバシー方針</Link>をご確認ください。</p></form></div></div></section>

    <footer className="border-t border-white/8 px-5 py-8 sm:px-8 lg:px-10"><div className="mx-auto flex max-w-6xl flex-col gap-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2"><img src={ICON_URL} alt="" className="h-6 w-6 rounded-md object-cover opacity-85" /><span>© 2026 StudyVerse</span></div><div className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/terms" className="transition hover:text-slate-200">利用規約</Link><Link href="/privacy" className="transition hover:text-slate-200">プライバシー方針</Link><Link href="/app" className="transition hover:text-slate-200">アプリを開く</Link></div></div></footer>
  </main>;
}
