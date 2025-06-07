"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { AuthenticationForm } from "@/components/Authentication/AuthencationForm";
import { signInWithGoogle } from "../social/google/action";
import { signInWithTwitter } from "../social/twitter/action";
import { signInWithGitHub } from "../social/github/action";

function LoginContent() {
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
    <AuthenticationForm
      searchParams={{ error }}
      handleGoogleLogin={handleGoogleLogin}
      handleTwitterLogin={handleTwitterLogin}
      handleGitHubLogin={handleGitHubLogin}
    />
  );
}

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
