import { ChatTab, SafeAreaLayout } from "@/src/core-ui/core-ui-index";
import { useUser } from "@clerk/clerk-expo";
import React from "react";

const Chat = () => {
  const { user } = useUser();
  return (
    <SafeAreaLayout
      className={`flex-1 bg-general-500`}
      child={<ChatTab user={user} />}
    />
  );
};

export default Chat;
