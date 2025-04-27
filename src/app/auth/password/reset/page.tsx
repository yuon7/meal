"use client";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };
  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

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
            <div className={styles.inputWrapper}>
              <input
                id="newPassword"
                name="newPassword"
                type={isRevealPassword ? "text" : "password"}
                required
                className={styles.input}
              />
              <button
                type="button"
                onClick={togglePassword}
                aria-label={
                  isRevealPassword ? "パスワードを非表示" : "パスワードを表示"
                }
                className={styles.iconButton}
              >
                {isRevealPassword ? (
                  <IconEye size={30} />
                ) : (
                  <IconEyeOff size={30} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className={styles.label}>
              新しいパスワード(確認):
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={isRevealConfirmPassword ? "text" : "password"}
                required
                className={styles.input}
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                aria-label={
                  isRevealConfirmPassword
                    ? "パスワードを非表示"
                    : "パスワードを表示"
                }
                className={styles.iconButton}
              >
                {isRevealConfirmPassword ? (
                  <IconEye size={30} />
                ) : (
                  <IconEyeOff size={30} />
                )}
              </button>
            </div>
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
