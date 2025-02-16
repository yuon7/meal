import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* ヘッダー */}
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/hono-logo.svg"
          alt="Hono Logo"
          width={120}
          height={120}
        />
        <h1 className={styles.title}>Next-Hono-Template</h1>
        <p className={styles.subtitle}>
          A modern template combining the power of Next.js and Hono.
        </p>
      </header>

      {/* ボタンコンテナ */}
      <div className={styles.buttonsContainer}>
        <a
          href="https://hono.dev"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Learn Hono
        </a>
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Explore Next.js
        </a>
      </div>

      {/* フッター */}
      <footer className={styles.footer}>
        <p>
          Created with ❤️ using{" "}
          <a href="https://hono.dev" target="_blank" rel="noopener noreferrer">
            Hono
          </a>{" "}
          and{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
