import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => readFileSync(path.join(root, relativePath), "utf8");

describe("StudyVerse紹介サイト", () => {
  it("価値・使い方・申込み・法的情報への導線を備える", () => {
    const site = read("client/src/pages/MarketingSite.tsx");
    const app = read("client/src/App.tsx");

    expect(site).toContain("WHAT STUDYVERSE DOES");
    expect(site).toContain("HOW TO START");
    expect(site).toContain("StudyJournal");
    expect(site).toContain("申込みを送信する");
    expect(site).toContain("/terms");
    expect(site).toContain("/privacy");
    expect(app).toContain('path={"/app"}');
    expect(app).toContain('path={"/terms"}');
    expect(app).toContain('path={"/privacy"}');
  });

  it("ホーム画面追加時は紹介サイトではなくアプリ本体を起動する", () => {
    const manifest = read("client/public/manifest.webmanifest");

    expect(manifest).toContain('"start_url": "/app"');
  });
});
