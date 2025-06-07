import { SupabaseProvider } from "@/components/SupabaseProvider/SupabaseProvider";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Metadata } from "next";
import classes from "./layout.module.css";

export const metadata: Metadata = {
  title: "Qrate",
  description: "用途に合ったご飯屋さんを選ぶアプリ",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#B26A00" },
    { media: "(prefers-color-scheme: light)", color: "#FFD180" },
  ],
  openGraph: {
    title: "Qrate",
    description: "用途に合ったご飯屋さんを選ぶアプリ",
    images: [
      {
        url: "/image/Qrate.jpg",
        width: 1200,
        height: 630,
        alt: "用途に合ったご飯屋さんを選ぶアプリ",
      },
    ],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qrate",
    description: "用途に合ったご飯屋さんを選ぶアプリ",
    images: ["/image/Qrate.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <SupabaseProvider>
          <MantineProvider>
            <div className={classes.rootContainer}>
              <div className={classes.contentWrapper}>{children}</div>
            </div>
          </MantineProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
