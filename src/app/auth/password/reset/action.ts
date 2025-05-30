"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const cookieStore = cookies();

  const data = {
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  if (data.newPassword !== data.confirmPassword) {
    redirect(
      `/auth/password/reset?error=${encodeURIComponent("パスワードが一致しません")}`,
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
  });

  if (error) {
    const errorMessages: Record<string, string> = {
      "Password should be at least 6 characters":
        "パスワードは6文字以上必要です",
      "New password should be different from the old password":
        "新しいパスワードを設定してください",
      "Auth session missing":
        "セッションが無効です。再度リセットメールを送信してください",
    };

    const message =
      errorMessages[error.message] || "パスワードリセットに失敗しました";
    redirect(`/auth/password/reset?error=${encodeURIComponent(message)}`);
  }

  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });

  redirect("/auth/login");
}
