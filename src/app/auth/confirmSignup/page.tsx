import styles from "./page.module.css";

export default function ConfirmSignupPage({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>確認メールを送信しました</h2>
        <p className={styles.text}>
          {searchParams.email} に確認メールを送信しました。
        </p>
        <p className={styles.text}>
          メール内のリンクをクリックして、アカウントを有効化してください。
        </p>
        <a href="/login" className={styles.link}>
          ログインページに戻る
        </a>
      </div>
    </div>
  );
}
