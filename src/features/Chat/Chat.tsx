"use client";

import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import TabNavigation, { TabType } from "@/components/TabNavigation/TabNavigation";
import ChatView from "@/components/ChatView/ChatView";
import RestaurantList from "@/components/RestaurantList/RestaurantList";
import ParticipantsList from "@/components/ParticipantsList/ParticipantsList";
import { useChatRooms } from "./hooks/useChatRooms";

interface ChatProps {
  user: User | null;
  roomId?: string;
}

export default function Chat({ user, roomId }: ChatProps) {
  if (!user) {
    return null;
  }

  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(roomId || null);
  const { rooms } = useChatRooms();

  useEffect(() => {
    if (roomId) {
      setSelectedRoomId(roomId);
    } else if (rooms.length > 0 && !selectedRoomId) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [roomId, rooms, selectedRoomId]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "chat":
        return <ChatView selectedRoomId={selectedRoomId} user={user} />;
      case "restaurants":
        return <RestaurantList />;
      case "participants":
        return <ParticipantsList selectedRoomId={selectedRoomId} user={user} />;
      default:
        return <ChatView selectedRoomId={selectedRoomId} user={user} />;
    }
  };

  return (
    <TabNavigation activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </TabNavigation>
  );
}
