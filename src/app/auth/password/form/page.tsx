import { ForgotPassword } from "@/components/Authentication/ForgotPassword/ForgotPassword";
import styles from "./page.module.css";

export default function forgotPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className={styles.container}>
      <ForgotPassword searchParams={searchParams} />
    </div>
  );
}
