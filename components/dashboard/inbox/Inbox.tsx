import React from "react";
import AllUserChart from "./AllUserChart";
import MessageChart from "./MessageChart";
import { myFetch } from "@/utils/myFetch";

export default async function Inbox({ userId }: { userId: string }) {
  const userList = await myFetch("/chats");
  const userMessage = await myFetch(`/messages/chat/${userId}`);

  return (
    <section className="grid grid-cols-[30%_auto] px-2">
      <div>
        <AllUserChart chatList={userList?.data} />
      </div>
      <div>
        <MessageChart userId={userId} userMessage={userMessage?.data} />
      </div>
    </section>
  );
}
