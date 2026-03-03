# このプロジェクトを GitHub に push する手順

## 1. GitHub でリポジトリを用意する

1. [GitHub](https://github.com) にログイン
2. 右上の **「+」** → **「New repository」**
3. **Repository name** に `shopify-design-helper`（任意でOK）を入力
4. **Public** を選択
5. **「Create repository」** をクリック  
   → **「…or push an existing repository from the command line」** のところに表示されるコマンドをあとで使います（URL をコピーしておく）

---

## 2. ターミナルでこのフォルダから実行する

プロジェクトのフォルダで以下を順に実行します。

```bash
# このフォルダに移動（まだなら）
cd /Users/tomoya_h/shopify-design-helper

# Git リポジトリとして初期化
git init

# 全ファイルをステージ
git add .

# 最初のコミット
git commit -m "Initial commit: Shopify Design Helper"

# メインブランチ名を main に（必要な場合）
git branch -M main

# GitHub のリポジトリを「origin」として登録（URL は自分のリポジトリに書き換え）
git remote add origin https://github.com/あなたのユーザー名/shopify-design-helper.git

# push
git push -u origin main
```

**注意:** `あなたのユーザー名/shopify-design-helper.git` の部分は、GitHub で作ったリポジトリの URL に合わせてください。  
（例: `https://github.com/tanaka/shopify-design-helper.git`）

---

## 3. 認証で聞かれたら

- **Username:** GitHub のユーザー名
- **Password:** 通常のパスワードではなく、**Personal Access Token (PAT)** を入力  
  → GitHub → Settings → Developer settings → Personal access tokens で発行できます。

---

これで GitHub にコードが push され、Vercel / Netlify で「リポジトリをインポート」すればデプロイできます。
