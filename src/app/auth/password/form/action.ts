"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
  };

  const { error, data: email } = await supabase.auth.resetPasswordForEmail(
    data.email,
    {
      redirectTo: process.env.RESET_REDIRECT_URL,
    }
  );
  if (email !== data.email) {
    redirect(
      `/auth/password/form?error=${encodeURIComponent("このメールアドレスは登録されていません。")}`
    );
  }

  if (error) {
    throw error;
  }
  redirect("/auth/login");
}
