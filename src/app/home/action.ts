"use server";

import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export interface CreateRoomData {
  maxUser: number;
  area: string;
  mealType: "lunch" | "dinner";
  date: string;
}

export async function createRoom(data: CreateRoomData) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("認証が必要です");
    }

    const room = await prisma.room.create({
      data: {
        maxUser: data.maxUser,
        area: data.area,
        mealType: data.mealType,
        date: data.date,
        isClosed: false,
      },
    });

    await prisma.roomParticipant.create({
      data: {
        roomId: room.id,
        userId: user.id,
        isHost: true,
      },
    });

    revalidatePath("/rooms");

    return {
      success: true,
      roomId: room.id,
    };
  } catch (error) {
    console.error("Room creation error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "ルームの作成に失敗しました",
    };
  }
}