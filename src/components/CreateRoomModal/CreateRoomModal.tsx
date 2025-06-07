import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  Stack,
  Group,
  Button,
  NumberInput,
  TextInput,
  ActionIcon,
  Text,
  Loader,
  Alert,
  Radio,
} from "@mantine/core";
import {
  IconMapPin,
  IconCurrentLocation,
  IconAlertCircle,
} from "@tabler/icons-react";
import { createRoom, CreateRoomData } from "@/app/home/action";

type CreateRoomProps = {
  opened: boolean;
  close: () => void;
};

export default function CreateRoomModal({ opened, close }: CreateRoomProps) {
  const router = useRouter();
  const [numPeople, setNumPeople] = useState<number | undefined>(2);
  const [location, setLocation] = useState("");
  const [timeSlot, setTimeSlot] = useState<"lunch" | "dinner">("lunch");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ja&addressdetails=1`,
      );
      const data = await response.json();

      if (data.error) {
        throw new Error("位置情報の取得に失敗しました");
      }

      const address = data.address;
      let locationName = "";

      if (address.city_district || address.suburb) {
        locationName = address.city_district || address.suburb;
      } else if (address.neighbourhood) {
        locationName = address.neighbourhood;
      } else if (address.city || address.town) {
        locationName = address.city || address.town;
      } else if (address.county) {
        locationName = address.county;
      } else {
        locationName = data.display_name.split(",")[0];
      }

      return locationName;
    } catch (error) {
      throw error;
    }
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("お使いのブラウザは位置情報に対応していません");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const locationName = await reverseGeocode(latitude, longitude);
          setLocation(locationName);
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        let errorMessage = "位置情報の取得に失敗しました";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "位置情報の使用が許可されていません";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "位置情報が利用できません";
            break;
          case error.TIMEOUT:
            errorMessage = "位置情報の取得がタイムアウトしました";
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  };

  useEffect(() => {
    if (opened && !location && !isGettingLocation) {
      getCurrentLocation();
    }
  }, [opened]);

  const handleSubmit = async () => {
    if (!numPeople || !location || !timeSlot || !date) return;

    setIsCreating(true);
    setCreateError("");

    try {
      const roomData: CreateRoomData = {
        maxUser: numPeople,
        area: location,
        mealType: timeSlot,
        date,
      };

      const result = await createRoom(roomData);

      if (result.success && result.roomId) {
        handleClose();
        router.push(`/rooms/${result.roomId}?created=true`);
      } else {
        setCreateError(result.error || "ルームの作成に失敗しました");
      }
    } catch (error) {
      setCreateError("ルームの作成中にエラーが発生しました");
      console.error("Room creation error:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setCreateError("");
    setNumPeople(2);
    setLocation("");
    setTimeSlot("lunch");
    setDate(() => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    });
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="ルームを作成"
      size="80%"
      centered
    >
      <Stack gap="md">
        <NumberInput
          label="人数"
          placeholder="人数を入力"
          value={numPeople}
          onChange={(value) =>
            setNumPeople(typeof value === "number" ? value : undefined)
          }
          min={1}
          max={15}
          required
        />

        <div>
          <Text size="sm" fw={500} mb={5}>
            場所
          </Text>
          <Group gap="xs">
            <TextInput
              flex={1}
              placeholder="エリア・駅（例：渋谷、新宿）"
              value={location}
              onChange={(event) => setLocation(event.currentTarget.value)}
              leftSection={<IconMapPin size={16} />}
              required
            />
            <ActionIcon
              variant="light"
              size="lg"
              onClick={getCurrentLocation}
              loading={isGettingLocation}
              disabled={isGettingLocation}
              title="現在地を取得"
            >
              {isGettingLocation ? (
                <Loader size={16} />
              ) : (
                <IconCurrentLocation size={16} />
              )}
            </ActionIcon>
          </Group>

          {locationError && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" mt="xs">
              {locationError}
            </Alert>
          )}
        </div>

        <Radio.Group
          label="時間帯"
          value={timeSlot}
          onChange={(val) => setTimeSlot(val as "lunch" | "dinner")}
          required
        >
          <Group mt="xs">
            <Radio value="lunch" label="ランチ (11:00-15:00)" />
            <Radio value="dinner" label="ディナー (17:00-22:00)" />
          </Group>
        </Radio.Group>

        <TextInput
          label="日付"
          type="date"
          value={date}
          onChange={(event) => setDate(event.currentTarget.value)}
          required
          min={new Date().toISOString().split("T")[0]}
        />

        {createError && (
          <Alert icon={<IconAlertCircle size={16} />} color="red">
            {createError}
          </Alert>
        )}

        <Group justify="space-between" mt="lg">
          <Button
            variant="filled"
            onClick={handleSubmit}
            disabled={!numPeople || !location || !timeSlot || !date}
            loading={isCreating}
          >
            {isCreating ? "作成中..." : "作成する"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
