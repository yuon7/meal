"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGitHub() {
  const supabase = await createClient();
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) console.error("GitHubログインエラー:", error.message);
  if (!error && url) redirect(url);
}
