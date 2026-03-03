# Shopify Design Helper

ストアのターゲット（性別・年齢）とイメージさせたいデザインを入力すると、**配色・フォント・テキストサイズ**の提案を受け取り、調整後に **Shopify で設定する手順ガイド** を生成する Web アプリです。

## 機能

1. **入力** … ターゲットの性別・年齢、デザインイメージ（高級感・カジュアル・ミニマルなど）を選択
2. **提案** … ルールベースで配色・フォント・テキストサイズを提案
3. **調整** … カラーピッカー・数値入力で自由に編集
4. **ガイド生成** … 「OK」で Dawn テーマ想定の設定手順を表示。コピーして利用可能

## 技術スタック

- Vite + React 19 + TypeScript
- Tailwind CSS 4

## セットアップと起動

```bash
cd shopify-design-helper
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開いて利用できます。

## ビルド

```bash
npm run build
npm run preview   # ビルド結果のプレビュー
```

## Web 上での公開（デプロイ）

静的サイトとしてそのままデプロイできます。以下のいずれかで公開できます。

### 方法 A: Vercel（推奨）

1. [Vercel](https://vercel.com) にアカウント作成（GitHub 連携可）
2. このプロジェクトを GitHub に push する
3. Vercel で「New Project」→ リポジトリをインポート
4. そのまま「Deploy」で完了（Vite を自動検出し、`vercel.json` の設定でビルド）

### 方法 B: Netlify

1. [Netlify](https://www.netlify.com) にアカウント作成
2. このプロジェクトを GitHub に push し、Netlify でリポジトリを接続
3. ビルド設定は `netlify.toml` により自動適用 → 「Deploy」で公開

### 方法 C: 手動デプロイ

```bash
npm run build
```

生成された `dist/` フォルダの中身を、任意の静的ホスティング（GitHub Pages・S3・Firebase Hosting など）にアップロードしてください。

---

### 公開後の修正・更新について

**はい、公開後も簡単に修正できます。**

- **Git と Vercel/Netlify を連携している場合**  
  コードを直して `git push` するだけで、自動で再ビルド・再デプロイされ、数分以内に本番に反映されます。追加作業は不要です。
- **手動デプロイの場合**  
  `npm run build` を再度実行し、出た `dist/` を同じ場所にアップロードし直せば反映されます。

いずれも「アプリの審査」や「ユーザー側のアップデート」は不要です。

## 今後の拡張案

- 利用が増えたら、Shopify に API 例外申請し、Dawn など特定テーマ向けに「設定をストアに自動反映」オプションを追加
- デザインイメージやテーマ別のプリセットを追加
- ガイドの PDF ダウンロード
