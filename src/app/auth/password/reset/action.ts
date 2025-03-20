"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const data = {
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  if (data.newPassword !== data.confirmPassword) {
    throw new Error("パスワードが一致しません。");
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: data.newPassword,
    });

    if (error) {
      throw error;
    }

    redirect("/auth/login");
  } catch (error) {
    console.error(error);
    redirect("/auth/notFoundTitle");
  }
}
