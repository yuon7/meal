# Next Hono Template

Next.js 内に Hono や Supabase Auth、Prisma を組み込んだフルスタックテンプレートです。
このテンプレートは、エッジランタイム専用のアプリケーションを構築するためのものです。

## 特徴

- **フロントエンド & バックエンド**: Next.js（Hono & Supabase Auth 統合）
- **データベース**: Supabase（Prisma Accelerate 経由で接続）
- **ORM**: Prisma
- **認証**: Supabase Auth
- **スタイリング**: CSS Modules
- **ホスティング**:
  - Next.js → Vercel
- **コード品質管理**: ESLint & stylelint
- **エッジランタイム対応**: Prisma Accelerate

## はじめに

### 必要なもの

- Node.js 18+
- npm

### セットアップ

1. リポジトリをクローン:
   ```sh
   git clone https://github.com/Sho0226/next-hono-template.git
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

   `.env`ファイルに必要な環境変数を入力。

4. Prisma Accelerate をセットアップ:
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
4. **プロジェクト URL**、**anon public API キー** をコピー。
5. `.env`ファイルに以下を追加:
   ```sh
   SUPABASE_URL=your_project_url
   SUPABASE_ANON_KEY=your_anon_key
   ```

## Prisma Accelerate の使用

Prisma Accelerate を使用する場合、専用の接続文字列が必要です。

この接続文字列は、通常`prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY`の形式です。

### Prisma Accelerate 接続文字列の生成方法

1. **Prisma Data Platform にサインアップ:**

   - Prisma の [Cloud Platform](https://console.prisma.io/) にアクセスし、GitHub などでサインアップします。

2. **新しいクラウドプロジェクトを作成:**

   - ダッシュボードで「新しいクラウドプロジェクト」を作成します。

3. **Accelerate を有効化:**

   - プロジェクト内で Accelerate を有効化します。これには、データベース接続文字列と近いロケーションの選択が必要です。

4. **API キーを生成:**

   - Accelerate を有効化後、API キーを生成します。この API キーは、接続文字列の一部として使用されます。

5. **接続文字列の生成:**

   - API キーを含む新しい接続文字列が生成されます。この文字列は、通常`prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY`の形式です。

6. **環境変数に設定:**
   - 生成された接続文字列を`.env`ファイルの`DATABASE_URL`として設定します。

### 例: .env ファイルの設定

```bash
# .env
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
```

この接続文字列は、Prisma Accelerate を通じてデータベースにアクセスするために使用されます。通常の PostgreSQL 接続文字列とは異なり、API キーを含んでいます。

### Supabase との統合

Supabase を使用する場合、通常の PostgreSQL 接続文字列を使用してデータベースに直接アクセスする必要があります。Prisma Accelerate の接続文字列は、Supabase の管理画面で直接使用できません。

## デプロイ

### フロントエンド & バックエンド（Vercel）

1. リポジトリを GitHub にプッシュ。
2. Vercel にリポジトリをインポート。
3. Vercel の環境変数設定で `.env` の内容を追加。
4. deploy

---

このテンプレートを使用することで、Next.js と Hono、Supabase Auth、Prisma を組み合わせたエッジランタイム専用のフルスタックアプリケーションを簡単に構築できます。また、Prisma Accelerate を使用することで、エッジ環境でのデータベースアクセスも可能になります。

---
