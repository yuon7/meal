"use client";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
        // URLクリーンアップ
        window.history.replaceState({}, "", "/auth/password/reset");
      } catch (error) {
        router.push(
          `/auth/password/reset?error=${encodeURIComponent(
            error instanceof Error ? error.message : "不明なエラー"
          )}`
        );
      } finally {
        setLoading(false);
      }
    };

    handleAuthentication();
  }, [supabase, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      router.push(
        `/auth/password/reset?error=${encodeURIComponent("パスワードが一致しません")}`
      );
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      // セッションを確実に更新するためフルリロード
      window.location.href = "/auth/login";
    } catch (error) {
      router.push(
        `/auth/password/reset?error=${encodeURIComponent(
          error instanceof Error ? error.message : "不明なエラー"
        )}`
      );
    }
  };

  if (loading) return <div>認証中...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form method="post" className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newPassword" className={styles.label}>
              新しいパスワード:
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className={styles.label}>
              新しいパスワード(確認):
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className={styles.input}
            />
          </div>
          {searchParams.error && (
            <div className={styles.error}>{searchParams.error}</div>
          )}
          <button
            type="submit"
            className={`${styles.button} ${styles.submitButton}`}
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}
