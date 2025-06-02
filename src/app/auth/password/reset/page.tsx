"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ResetPassword } from "@/components/Authentication/ResetPassword/ResetPassword";
import { Loader } from "@mantine/core";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const token_hash = params.get("token_hash");

    const handleAuthentication = async () => {
      try {
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (token_hash) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: "recovery",
          });
          if (error) throw error;
        } else {
          throw new Error("認証情報が不足しています");
        }
        window.history.replaceState({}, "", "/auth/password/reset");
      } catch (error) {
        router.push(
          `/auth/password/reset?error=${encodeURIComponent(
            error instanceof Error ? error.message : "不明なエラー"
          )}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthentication();
  }, [supabase, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      newPassword: formData.get("newPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    if (data.newPassword !== data.confirmPassword) {
      router.push(
        `/auth/password/reset?error=${encodeURIComponent("パスワードが一致しません")}`
      );
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;
      window.location.href = "/auth/login";
    } catch (error) {
      router.push(
        `/auth/password/reset?error=${encodeURIComponent(
          error instanceof Error ? error.message : "不明なエラー"
        )}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader color="blue" size="xl" />
      ) : (
        <ResetPassword searchParams={searchParams} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
