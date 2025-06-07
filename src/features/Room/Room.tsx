"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  Stack,
  Divider,
  Container,
  Alert,
  Button,
  Box,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

import { LoadingState } from "@/components/LoadingState/LoadingState";
import { RoomHeader } from "@/components/RoomHeader/RoomHeader";
import { RoomBasicInfo } from "@/components/RoomBasicInfo/RoomBasicInfo";
import {
  ParticipantsSection,
  RoomParticipant,
} from "@/components/RoomParticipants/RoomParticipants";
import { RoomShare } from "@/components/RoomShare/RoomShare";

export type RoomWithParticipant = {
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

export const RoomPage = ({ roomId: roomid }: RoomPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCreated = searchParams.get("created") === "true";

  const [loading, setLoading] = useState<boolean>(true);
  const [roomWithParticipant, setRoomWithParticipant] =
    useState<RoomWithParticipant | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRoomInfo = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`/api/rooms/${roomid}`, { method: "GET" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "ルーム情報の取得に失敗しました");
      }
      setRoomWithParticipant(data as RoomWithParticipant);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
      setRoomWithParticipant(null);
    } finally {
      setLoading(false);
    }
  }, [roomid]);

  useEffect(() => {
    setLoading(true);
    fetchRoomInfo();

    const interval = setInterval(() => {
      fetchRoomInfo();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchRoomInfo]);

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

  const handleQrate = () => {
    const payload = JSON.stringify(roomWithParticipant);
    const encoded = encodeURIComponent(payload);
    router.push(`/meal3?room=${encoded}`);
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <RoomHeader
            isClosed={isClosed}
            participantCount={RoomParticipant.length}
            maxUser={maxUser}
          />
          <Divider mb="sm" />
          <RoomBasicInfo
            area={area}
            mealType={mealType}
            date={date}
            createdAt={createdAt}
          />
          <Divider my="sm" />
          <ParticipantsSection
            participants={RoomParticipant}
            maxUser={maxUser}
          />
          <Box mt="md" style={{ textAlign: "center" }}>
            <Button onClick={handleQrate}>Qrate</Button>
          </Box>
        </Card>
        <RoomShare roomId={id} showCreatedAlert={isCreated} />
      </Stack>
    </Container>
  );
};
