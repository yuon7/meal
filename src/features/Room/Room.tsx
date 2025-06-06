"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  Stack,
  Divider,
  Container,
  Alert,
  Button,
  Text,
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

export const RoomPage = ({ roomId: roomid }: RoomPageProps) => {
  const searchParams = useSearchParams();
  const isCreated = searchParams.get("created") === "true";

  const [loading, setLoading] = useState<boolean>(true);
  const [roomWithParticipant, setRoomWithParticipant] =
    useState<RoomWithParticipant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState<boolean>(false);

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

  const handleJoin = async () => {
    try {
      setIsJoining(true);
      setError(null);
      const res = await fetch(`/rooms/${roomid}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "参加に失敗しました");
      }
      await fetchRoomInfo();
    } catch (err) {
      setError(err instanceof Error ? err.message : "参加エラーが発生しました");
    } finally {
      setIsJoining(false);
    }
  };

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

  const currentUserId = (() => {
    return null as string | null;
  })();

  const alreadyJoined =
    currentUserId && RoomParticipant.some((p) => p.userId === currentUserId);

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
            {alreadyJoined ? (
              <Text c="dimmed">すでに参加済みです</Text>
            ) : RoomParticipant.length < maxUser ? (
              <Button onClick={handleJoin} loading={isJoining}>
                参加する
              </Button>
            ) : (
              <Text c="red" fw={500}>
                満員です
              </Text>
            )}
          </Box>
        </Card>
        <RoomFooter roomId={id} isCreated={isCreated} />
      </Stack>
    </Container>
  );
};
