"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// tokenからユーザーIDを取得する関数
async function getUserIdFromToken(token: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error) {
    throw error;
  }
  return data.user.id;
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const data = {
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    token: formData.get("token") as string, // リセットリンクから取得したトークン
  };

  if (data.newPassword !== data.confirmPassword) {
    throw new Error("パスワードが一致しません。");
  }

  try {
    const userId = await getUserIdFromToken(data.token);
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: data.newPassword,
    });

    if (error) {
      throw error;
    }

    redirect("/auth/login");
  } catch (error) {
    console.error(error);
    redirect("auth/notFoundTitle");
  }
}
