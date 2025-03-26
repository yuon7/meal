"use client";
import { resetPassword } from "./action";
import styles from "./page.module.css";

export default function ResetPasswordPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      alert("パスワードが一致しません。");
      return;
    }

    await resetPassword(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>パスワードをリセット</h2>
        <p className={styles.text}>新しいパスワードを入力してください。</p>
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
              新しいパスワードの確認:
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
