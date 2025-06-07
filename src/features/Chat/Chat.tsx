"use client";

import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import TabNavigation, { TabType } from "@/components/TabNavigation/TabNavigation";
import ChatView from "@/components/ChatView/ChatView";
import RestaurantList from "@/components/RestaurantList/RestaurantList";
import ParticipantsList from "@/components/ParticipantsList/ParticipantsList";
import { useChatRooms } from "./hooks/useChatRooms";

export default function Chat({ user }: { user: User | null }) {
  if (!user) {
    return null;
  }

  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const { rooms } = useChatRooms();

  useEffect(() => {
    if (rooms.length > 0 && !selectedRoomId) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [rooms, selectedRoomId]);

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
