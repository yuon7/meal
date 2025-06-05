import Home from "@/features/Home/Home";
import { RoomCard } from "@/features/Room/Room";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default async function HomePage() {
  const supabase = await createClient();
  const router = useRouter();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  

  const {roomId} = router.query;


  if (!user) {
    redirect("/auth/login");
  }
  if (!roomId || typeof roomId !== 'string') {
    return <p>Invalid room ID</p>;
  }

  return <RoomCard roomId={roomId }  />;
}