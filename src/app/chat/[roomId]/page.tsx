import Chat from "@/features/Chat/Chat";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface ChatPageProps {
  params: {
    roomId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <Chat user={user} roomId={params.roomId} />;
}