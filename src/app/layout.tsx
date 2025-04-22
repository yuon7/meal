import { HeaderMegaMenu } from "@/components/Header/Header";
import { createClient } from "@/lib/supabase/server";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next-Hono-Template",
  description: "A modern template combining Next.js and Hono.",
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
        <MantineProvider>
          <HeaderMegaMenu user={user} />
          {children}
          <Analytics />
        </MantineProvider>
      </body>
    </html>
  );
}
