import Image from "next/image";
import styles from "./page.module.css";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <div className={styles.container}>
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
    </div>
  );
}
