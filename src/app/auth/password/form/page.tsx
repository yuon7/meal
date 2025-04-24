import { forgotPassword } from "./action";
import styles from "./page.module.css";

export default function forgotPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>パスワードをリセット</h2>
        <p className={styles.text}>
          パスワードをリセットするためのリンクを送信します。
          <br />
          送信後、メール内のリンクをクリックしてパスワードをリセットしてください。
        </p>

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
          {searchParams.error && (
            <div className={styles.error}>{searchParams.error}</div>
          )}
          <button
            formAction={forgotPassword}
            className={`${styles.button} ${styles.submitButton}`}
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}
