"use client";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import styles from "./page.module.css";

export default function ResetPasswordPage() {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setSuccess] = useState(false);

  useEffect(() => {
    // リセットのurlから認証コードを取得
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const token_hash = params.get('token_hash');

    // 認証コードがある場合はセッションを取得する
    if (code) {
      supabase.auth.exchangeCodeForSession(code)
        .then(({ error }) => {
          if (error) {
            console.error('Session error:', error);
            setError(`認証エラー: ${error.message}`);
          } else {
            setSuccess(true);
          }
          setLoading(false);
        });
    } else if (token_hash) {
      supabase.auth.verifyOtp({ 
        token_hash, 
        type: 'recovery'
      }).then(({ error }) => {
        if (error) {
          setError(`認証エラー: ${error.message}`);
        } else {
          setSuccess(true);
        }
        setLoading(false);
      });
    } else {
      setError("認証コードがありません。パスワードリセットリンクが正しくないか期限切れです。");
      setLoading(false);
    }
  }, [supabase]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      alert("パスワードが一致しません");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        alert(`パスワードの更新に失敗しました: ${error.message}`);
      } else {
        alert("パスワードが正常にリセットされました。");
        window.location.href = "/";
      }
    } catch (error) {
      alert(error);
    }

  };

  if (loading) return <div>認証中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>パスワードをリセット</h2>
        <p className={styles.text}>新しいパスワードを入力してください</p>
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
