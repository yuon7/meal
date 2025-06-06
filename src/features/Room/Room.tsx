"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, Stack, Divider, Container, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

import { LoadingState } from "@/components/LoadingState/LoadingState";
import { RoomHeader } from "@/components/RoomHeader/RoomHeader";
import { RoomBasicInfo } from "@/components/RoomBasicInfo/RoomBasicInfo";
import {
  ParticipantsSection,
  RoomParticipant,
} from "@/components/RoomParticipants/RoomParticipants";
import { RoomFooter } from "@/components/RoomFooter/RoomFooter";

type RoomWithParticipant = {
  id: string;
  maxUser: number;
  area: string;
  mealType: string;
  date: string;
  isClosed: boolean;
  createdAt: Date;
  RoomParticipant: RoomParticipant[];
};

interface RoomPageProps {
  roomId: string;
}

export const RoomPage = ({ roomId }: RoomPageProps) => {
  const searchParams = useSearchParams();
  const isCreated = searchParams.get("created") === "true";

  const [loading, setLoading] = useState<boolean>(true);
  const [roomWithParticipant, setRoomWithParticipant] =
    useState<RoomWithParticipant | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/rooms/${roomId}`);

        if (!res.ok) {
          throw new Error("ルーム情報の取得に失敗しました");
        }

        const data = await res.json();
        setRoomWithParticipant(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  if (loading) {
    return <LoadingState isCreated={isCreated} />;
  }
  if (error || !roomWithParticipant) {
    return (
      <Container size="md" py="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="エラー"
            color="red"
          >
            {error || "ルーム情報が見つかりません"}
          </Alert>
        </Card>
      </Container>
    );
  }
  const {
    id,
    maxUser,
    area,
    mealType,
    date,
    isClosed,
    createdAt,
    RoomParticipant,
  } = roomWithParticipant;

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <RoomHeader
            isClosed={isClosed}
            participantCount={RoomParticipant.length}
            maxUser={maxUser}
          />
          <Divider />
          <RoomBasicInfo
            area={area}
            mealType={mealType}
            date={date}
            createdAt={createdAt}
          />
          <Divider />
          <ParticipantsSection
            participants={RoomParticipant}
            maxUser={maxUser}
          />
        </Card>
        <RoomFooter roomId={id} isCreated={isCreated} />
      </Stack>
    </Container>
  );
};
