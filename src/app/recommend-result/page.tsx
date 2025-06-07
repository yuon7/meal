import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ClientPage from "./client-page";

interface RecommendResultPageProps {
  searchParams: {
    data?: string;
  };
}

export default async function RecommendResultPage({ searchParams }: RecommendResultPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!searchParams.data) {
    redirect("/aidemo");
  }

  let results;
  try {
    results = JSON.parse(decodeURIComponent(searchParams.data));
  } catch (error) {
    console.error("Failed to parse recommendation data:", error);
    redirect("/aidemo");
  }

  return <ClientPage user={user} results={results} />;
}