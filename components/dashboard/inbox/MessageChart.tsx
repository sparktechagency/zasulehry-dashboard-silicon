/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import image from "../../../public/user.png";
import Image from "next/image";
import ChatInput from "./ChartInput";
import { useSocket } from "@/lib/SocketContext";
import { myFetch } from "@/utils/myFetch";

type Message = {
  sender: string;
  text: string;

  avatar?: string;
};

const ChatMessages = ({
  userId,
  userMessage,
}: {
  userId: string;
  userMessage: any;
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userTextMessage, setUserTextMessage] = useState("");
  const { socket } = useSocket();

  console.log("messages", messages);

  // socket listener-----------------
  useEffect(() => {
    if (!socket || !userId) return;

    const eventName = `getMessage::${userId}`;

    const handleIncomingMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);

      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    };

    socket.on(eventName, handleIncomingMessage);

    return () => {
      socket.off(eventName, handleIncomingMessage);
    };
  }, [socket, userId]);

  const handleMessageSend = async () => {
    if (!userTextMessage.trim() || !userId) return;

    const newMessage: Message = {
      text: userTextMessage,
      sender: "me",
    };

    try {
      await myFetch("/messages/create", {
        method: "POST",
        body: {
          chat: userId,
          text: userTextMessage,
        },
      });

      setMessages((prev) => [...prev, newMessage]);
      setUserTextMessage("");

      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div
      className="  bg-white  rounded-md flex flex-col"
      style={{ height: "calc(100vh - 88px)" }}
    >
      <div className="flex items-center  gap-2 py-4 px-5 border-b-2 border-b-gray-200">
        <Image src={image} width={50} height={50} alt="header" />
        <div className="font-medium">
          <h1 className="2xl:text-xl">Kamran Khan</h1>
          {/* <p className="text-xs">Typing...</p> */}
        </div>
      </div>
      {/* Messages container */}
      <div className="flex-1 flex flex-col p-4 overflow-y-auto hide-scrollbar">
        <div className="space-y-4">
          {userMessage?.map((item: any, index: number) => (
            <div
              key={index}
              className={`flex ${
                item?.sender?.name ? "justify-end" : "justify-start"
              }`}
            >
              {item.sender === "other" && (
                <Image
                  src={image}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}

              <div>
                <div
                  className={`whitespace-pre-line px-4 py-1.5 rounded-lg text-xs 2xl:text-lg ${
                    item?.sender?.name
                      ? "bg-cyan-900 rounded-br-none text-white"
                      : "bg-[#B2D1D8] rounded-bl-none text-[#545454]"
                  }`}
                >
                  {item.text}
                </div>
                <div className="text-[#B0B0B0] text-right text-[9px]">
                  {item.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input at bottom */}
      <div className="border-t">
        <ChatInput
          message={userTextMessage}
          setMessage={setUserTextMessage}
          onHandle={handleMessageSend}
        />
      </div>
    </div>
  );
};

export default ChatMessages;
