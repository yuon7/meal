"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Logout } from "../../logout/action";

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const data = {
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  if (data.newPassword !== data.confirmPassword) {
    redirect(
      `/auth/resetPassword?error=${encodeURIComponent("パスワードが一致しません。")}`
    );
    return;
  }

  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
  });

  if (error) {
    const errorMessages: { [key: string]: string } = {
      "Password should be at least 6 characters":
        "パスワードは6文字以上必要です。",
    };

    const errorMessage =
      errorMessages[error.code || error.message] || error.message;
    redirect(`/auth/resetPassword?error=${encodeURIComponent(errorMessage)}`);
  }

  Logout();
  redirect("/");
}
