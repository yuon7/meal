"use client";
import { createClient } from "@/utils/supabase/client";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [supabaseClient] = useState(() => createClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};
