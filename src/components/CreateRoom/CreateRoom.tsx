import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Radio,
  Button,
  Group,
  Stack,
  Text,
} from "@mantine/core";

type CreateRoomProps = {
  opened: boolean;
  close: () => void;
};

export default function CreateRoom({ opened, close }: CreateRoomProps) {
  const [numPeople, setNumPeople] = useState<number | undefined>(2);
  const [location, setLocation] = useState("取得中...");
  const [timeSlot, setTimeSlot] = useState<"lunch" | "dinner">("lunch");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("ジオロケーション非対応");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      },
      (error) => {
        console.error("位置情報取得エラー", error);
        setLocation("位置情報取得失敗");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  const handleSubmit = () => {
    console.log({ numPeople, location, timeSlot, date });
    close();
  };

  return (
    <Modal opened={opened} onClose={close} title="ルームを作成" size="70%">
      <Stack>
        <NumberInput
          label="人数"
          placeholder="人数を入力"
          value={numPeople}
          onChange={(value) =>
            setNumPeople(typeof value === "number" ? value : undefined)
          }
          min={1}
          max={15}
        />
        <TextInput
          label="場所（緯度・経度）"
          placeholder="例：35.689487, 139.691706"
          value={location}
          onChange={(event) => setLocation(event.currentTarget.value)}
        />
        {location === "取得中..." && (
          <Text size="xs" color="dimmed">
            現在地を取得中です…
          </Text>
        )}
        <Radio.Group
          label="時間帯"
          value={timeSlot}
          onChange={(val) => setTimeSlot(val as "lunch" | "dinner")}
        >
          <Group mt="xs">
            <Radio value="lunch" label="ランチ" />
            <Radio value="dinner" label="ディナー" />
          </Group>
        </Radio.Group>
        <TextInput
          label="日付"
          type="date"
          value={date}
          onChange={(event) => setDate(event.currentTarget.value)}
        />
        <Group justify="flex-end" mt="lg">
          <Button variant="filled" onClick={handleSubmit}>
            作成する
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
