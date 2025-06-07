"use client";
import { AuthenticationForm } from "@/components/Authentication/AuthencationForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { signInWithGitHub } from "../social/github/action";
import { signInWithGoogle } from "../social/google/action";
import { signInWithTwitter } from "../social/twitter/action";
import styles from "./page.module.css";
import { Loader } from "@mantine/core";
import React from "react";

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
      <Suspense fallback={<Loader color="blue" size="xl" />}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
