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

  const fetchRooms = useCallback(async () => {
    try {
      const response = await fetch("/api/rooms");
      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }
      const rooms: Room[] = await response.json();
      setRooms(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return {
    rooms,
    fetchRooms,
  };
}