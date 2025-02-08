# Next Hono Template

Next.js 内に Hono や Supabase Auth を組み込んだフルスタックテンプレート。

## 特徴

- **フロントエンド & バックエンド**: Next.js（Hono & Supabase Auth 統合）
- **データベース**: Supabase
- **ORM**: Prisma
- **認証**: Supabase Auth
- **スタイリング**: Tailwind CSS
- **ホスティング**:
  - Next.js → Vercel
- **コード品質管理**: ESLint & Prettier

## はじめに

### 必要なもの

- Node.js 18+
- npm

### セットアップ

1. リポジトリをクローン:
   ```sh
   git clone https://github.com/your-username/next-hono-template.git
   cd next-hono-template
   ```
2. 依存関係をインストール:
   ```sh
   npm install
   ```
3. 環境変数を設定:
   ```sh
   cp .env.example .env
   ```
   `.env` ファイルに必要な環境変数を入力。
4. データベースをセットアップ:
   ```sh
   npx prisma migrate dev
   ```
5. ローカル開発サーバーを起動:
   ```sh
   npm run dev
   ```

## Supabase のセットアップ

1. [Supabase](https://supabase.com/) にアクセスしてサインアップ。
2. 新しいプロジェクトを作成。
3. **プロジェクト設定** → **API** に移動。
4. **プロジェクト URL**、**anon public API キー**、**データベースの URL** をコピー。
5. `.env` ファイルに以下を追加:
   ```sh
   SUPABASE_URL=your_project_url
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_DATABASE_URL=your_database_url
   ```

## デプロイ

### フロントエンド & バックエンド（Vercel）

1. リポジトリを GitHub にプッシュ。
2. Vercel にリポジトリをインポート。
3. Vercel の環境変数設定で `.env` の内容を追加。
4. デプロイ！
