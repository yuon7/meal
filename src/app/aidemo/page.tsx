import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ClientPage from "./client-page";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <ClientPage user={user} />;
}
