import type { Metadata } from "next";
import "/styles/globals.css"; // グローバルCSSを正しいパスでインポート
import Header from "@/components/Header/Header"; // ヘッダーコンポーネントをインポート

export const metadata: Metadata = {
  title: "Next-Hono-Template",
  description: "A modern template combining Next.js and Hono.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
