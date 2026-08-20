import { describe, expect, it } from "vitest";
import { siteApplicationInput } from "./routers";

describe("紹介サイトの申込み入力", () => {
  it("必要な連絡先を受け入れ、任意項目を整理する", () => {
    const result = siteApplicationInput.parse({
      name: "山田 花子",
      email: "hanako@example.jp",
      organization: "学習サポート教室",
      role: "担当者",
      message: "利用方法について相談したいです。",
    });

    expect(result).toMatchObject({ name: "山田 花子", email: "hanako@example.jp" });
  });

  it("名前の未入力、不正なメール形式、長すぎる内容を拒否する", () => {
    expect(() => siteApplicationInput.parse({ name: "", email: "hanako@example.jp" })).toThrow("お名前");
    expect(() => siteApplicationInput.parse({ name: "山田 花子", email: "invalid-address" })).toThrow("メールアドレス");
    expect(() => siteApplicationInput.parse({ name: "山田 花子", email: "hanako@example.jp", message: "a".repeat(2001) })).toThrow();
  });
});
