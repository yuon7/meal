"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    let errorMessage = error.message;
    if (error.message === "Invalid login credentials") {
      errorMessage = "メールアドレスまたはパスワードが間違っています。";
    }
    redirect(`/auth/login?error=${encodeURIComponent(errorMessage)}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    let errorMessage = error.message;
    if (error.message.includes("User already registered")) {
      errorMessage = "このメールアドレスは既に登録されています。";
    }
    redirect(`/auth/login?error=${encodeURIComponent(errorMessage)}`);
  }

  redirect(`/auth/confirmSignup?email=${encodeURIComponent(data.email)}`);
}
