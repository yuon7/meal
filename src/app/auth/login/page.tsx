"use client";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { AuthenticationForm } from "@/components/Authentication/AuthencationForm";
import { signInWithGoogle } from "../social/google/action";
import { signInWithTwitter } from "../social/twitter/action";
import { signInWithGitHub } from "../social/github/action";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || undefined;
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };
  const handleTwitterLogin = async () => {
    await signInWithTwitter();
  };
  const handleGitHubLogin = async () => {
    await signInWithGitHub();
  };

  return (
    <div className={styles.container}>
      <AuthenticationForm
        searchParams={{ error }}
        handleGoogleLogin={handleGoogleLogin}
        handleTwitterLogin={handleTwitterLogin}
        handleGitHubLogin={handleGitHubLogin}
      />
    </div>
  );
}
