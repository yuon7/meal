import { HeaderMegaMenu } from "@/components/Header/Header";
import { SupabaseProvider } from "@/components/SupabaseProvider/SupabaseProvider";
import { createClient } from "@/lib/supabase/server";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import classes from "./layout.module.css";

export const metadata: Metadata = {
  title: "Meal",
  description: "なんかお店出してくれます",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#B26A00" },
    { media: "(prefers-color-scheme: light)", color: "#FFD180" },
  ],
  openGraph: {
    title: "Meal",
    description: "なんかお店出してくれます",
    images: [
      {
        url: "/image/dummy.jpg",
        width: 1200,
        height: 630,
        alt: "おしゃれな料理の写真",
      },
    ],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meal",
    description: "なんかお店出してくれます",
    images: ["/image/dummy.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <SupabaseProvider>
          <MantineProvider>
            <div className={classes.rootContainer}>
              <HeaderMegaMenu user={user} />
              <div className={classes.contentWrapper}>{children}</div>
            </div>
            <Analytics />
          </MantineProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
