"use server";

import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";
import { CreateRoomData } from "@/app/home/action";

const prisma = new PrismaClient();

interface waitingRoomData {
  id: string;
  roomId: string;
  userId: string;
  isHost: Boolean;
  room: CreateRoomData;
}

export async function waitingRoom(data: waitingRoomData) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("認証が必要です");
    }

    const roomWithParticipant = await prisma.room.findUnique({
      where: {
        id: data.roomId,
      },
      include: {
        RoomParticipant: true,
      },
    });
    if (!roomWithParticipant) {
      throw new Error("ルームが見つかりません");
    }

    if (
      roomWithParticipant.RoomParticipant.length >= roomWithParticipant.maxUser
    ) {
      throw new Error("ルームが満員です");
    }
    if (
      !roomWithParticipant.RoomParticipant.some(
        (participant) => participant.userId === user.id
      )
    ) {
      await prisma.roomParticipant.create({
        data: {
          roomId: data.roomId,
          userId: user.id,
          isHost: false,
        },
      });
    }
    return {
      success: true,
      room: roomWithParticipant,
    };
  } catch (error) {
    console.error("Waiting room error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "ルームへの参加に失敗しました",
    };
  }
}
