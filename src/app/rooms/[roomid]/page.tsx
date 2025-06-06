import { RoomPage as RoomPageComponent } from "@/features/Room/Room";
import { waitingRoom } from "@/app/rooms/[roomid]/action";

export default async function RoomPage({
  params,
}: {
  params: { roomid: string };
}) {
  const { roomid: roomId } = params;

  if (!roomId) {
    return <p>ルームIDが指定されていません。</p>;
  }

  const result = await waitingRoom({ roomId });

  if (!result.success) {
    return <p>{result.error ?? "Invalid room ID"}</p>;
  }

  if (!result.room) {
    return <p>ルームデータが存在しません。</p>;
  }

  return <RoomPageComponent roomId={result.room.id} />;
}
