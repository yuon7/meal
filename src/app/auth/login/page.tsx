"use client";
import { login, signup } from "@/app/auth/login/action";
import styles from "./page.module.css";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form method="post" className={styles.form}>
          <div>
            <label htmlFor="email" className={styles.label}>
              メールアドレス:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={styles.input}
            />
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>
              パスワード:
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="password"
                name="password"
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
          {searchParams.error && (
            <div className={styles.error}>{searchParams.error}</div>
          )}

          <div className={styles.buttonGroup}>
            <button
              formAction={login}
              className={`${styles.button} ${styles.loginButton}`}
            >
              ログイン
            </button>
            <button
              formAction={signup}
              className={`${styles.button} ${styles.signupButton}`}
            >
              サインアップ
            </button>
          </div>
        </form>
      </div>
      <a href="/auth/password/form" className={styles.passwordReset}>
        パスワードを忘れた場合
      </a>
    </div>
  );
}
