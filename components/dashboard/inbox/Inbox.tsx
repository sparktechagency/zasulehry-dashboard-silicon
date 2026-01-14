import React from "react";
import AllUserChart from "./AllUserChart";
import MessageChart from "./MessageChart";
import { myFetch } from "@/utils/myFetch";
import { getToken } from "@/utils/getToken";

export default async function Inbox({ userId }: { userId: string }) {
  const userList = await myFetch("/chats");
  const userChatDetails = await myFetch(`/chats/${userId}`);
  const token = await getToken();

  return (
    <section className="grid grid-cols-[30%_auto] px-2">
      <div>
        <AllUserChart chatList={userList?.data} />
      </div>
      <div>
        <MessageChart
          userId={userId}
          token={token}
          userChatDetails={userChatDetails?.data}
        />
      </div>
    </section>
  );
}
