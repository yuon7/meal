import type { Metadata } from "next";
import "/styles/globals.css";
import Header from "@/components/Header/Header";
import { MantineProvider } from "@mantine/core";

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
        <MantineProvider>
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
