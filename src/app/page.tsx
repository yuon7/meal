import Home from "@/features/Home/Home";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <Home user={user} />;
}
