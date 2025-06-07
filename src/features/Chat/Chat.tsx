"use client";

import ChatView from "@/components/ChatView/ChatView";
import ParticipantsList from "@/components/ParticipantsList/ParticipantsList";
import RestaurantList from "@/components/RestaurantList/RestaurantList";
import TabNavigation, {
  TabType,
} from "@/components/TabNavigation/TabNavigation";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useChatMessages } from "./hooks/useChatMessages";
import { useChatRooms } from "./hooks/useChatRooms";
import { useRoomParticipants } from "./hooks/useRoomParticipants";

interface ChatProps {
  user: User | null;
  roomId?: string;
}

export default function Chat({ user, roomId }: ChatProps) {
  if (!user) {
    return null;
  }

  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(
    roomId || null
  );

  const { rooms } = useChatRooms();
  const { messages, newMessage, setNewMessage, handleSendMessage } =
    useChatMessages(selectedRoomId, user);
  const { participants } = useRoomParticipants(selectedRoomId, user);

  useEffect(() => {
    if (roomId) {
      setSelectedRoomId(roomId);
    } else if (rooms.length > 0 && !selectedRoomId) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [roomId, rooms, selectedRoomId]);

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  const renderTabContent = () => {
    switch (activeTab) {
      case "chat":
        return (
          <ChatView
            selectedRoomId={selectedRoomId}
            selectedRoom={selectedRoom}
            user={user}
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            participants={participants}
          />
        );
      case "restaurants":
        return <RestaurantList />;
      case "participants":
        return (
          <ParticipantsList
            selectedRoomId={selectedRoomId}
            user={user}
            participants={participants}
          />
        );
      default:
        return (
          <ChatView
            selectedRoomId={selectedRoomId}
            selectedRoom={selectedRoom}
            user={user}
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            participants={participants}
          />
        );
    }
  };

  return (
    <TabNavigation activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </TabNavigation>
  );
}
