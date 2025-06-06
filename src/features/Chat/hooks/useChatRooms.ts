import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";

export interface Room {
  id: string;
  maxUser: number;
  area: string;
  mealType: string;
  date: string;
  isClosed: boolean;
  createdAt: string;
}

export function useChatRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const supabase = createClient();

  const fetchRooms = useCallback(async () => {
    try {
      const { data: rooms, error } = await supabase
        .from("Room")
        .select("*")
        .eq("isClosed", false)
        .order("createdAt", { ascending: false });

      if (error) {
        console.error("Error fetching rooms:", error);
        setRooms([]);
        return;
      }

      if (!rooms) {
        setRooms([]);
        return;
      }

      setRooms(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
    }
  }, [supabase]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return {
    rooms,
    fetchRooms,
  };
}