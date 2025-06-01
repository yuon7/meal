"use client";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { AuthenticationForm } from "@/components/Authentication/AuthencationForm";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const error = errorParam === null ? undefined : errorParam;
  return (
    <div className={styles.container}>
      <AuthenticationForm searchParams={{ error }} />
    </div>
  );
}
