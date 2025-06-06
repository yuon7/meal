"use client";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { AuthenticationForm } from "@/components/Authentication/AuthencationForm";
import { signInWithGoogle } from "../google/action";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || undefined;
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div className={styles.container}>
      <AuthenticationForm
        searchParams={{ error }}
        handleGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
}
