import { redirect } from "next/navigation";
import TodoApp from "@/features/TodoApp/TodoApp";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

export default async function TodoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo} />
        <h1 className={styles.title}>Next-Hono-Template</h1>
        <p className={styles.subtitle}>
          A modern template combining the power of Next.js and Hono.
        </p>
      </header>
      <TodoApp />
    </div>
  );
}
