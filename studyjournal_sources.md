# StudyJournal ニュース取得メモ

## 現在の候補取得元

- BBC News World RSS: https://feeds.bbci.co.uk/news/world/rss.xml
  - 2026-08-17の確認時点で、世界ニュースのRSS XML、記事タイトル、リンク、公開日時を返した。
  - RSS本文ではなく、タイトル・リンク・公開日時を候補情報として使い、アプリはAIによるオリジナル学習要約を生成する。
  - フィード内に再利用条件への案内があるため、表示は出典リンクと最小限のメタデータにとどめる。

## 検討した代替

- GDELT DOC API: https://api.gdeltproject.org/api/v2/doc/doc
  - GDELT公式データ説明: https://www.gdeltproject.org/data.html
  - GDELT公式DOC API説明: https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/
  - 直近ニュースのJSON記事一覧を返せるが、共有環境ではレート制限応答が発生したため、現在の実装では主取得元にしていない。

## UI上の注意

- 「世界で起きた全ての出来事」ではなく、直近の主要な国際ニュースを扱うと明示する。
- 出典、公開日時、報道時点の情報であることを必ず表示する。
