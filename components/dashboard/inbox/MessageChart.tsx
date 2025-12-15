"use client";
import React, { useRef, useState } from "react";
import image from "../../../public/user.png";
import Image from "next/image";
import ChatInput from "./ChartInput";

const initialMessages = [
  {
    id: 1,
    sender: "me",
    text: "Hi How Are You",
    time: "07:00 Pm",
  },
  {
    id: 2,
    sender: "other",
    text: "What About You Today?",
    time: "07:02 Pm",
    avatar: "https://via.placeholder.com/150", // Replace with real avatar URL
  },
  {
    id: 3,
    sender: "me",
    text: "Hi How Are You",
    time: "07:00 Pm",
  },
  {
    id: 4,
    sender: "other",
    text: "What About You Today?",
    time: "07:02 Pm",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    sender: "other",
    text: "What About You Today?",
    time: "07:02 Pm",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    sender: "other",
    text: "What About You Today?",
    time: "07:02 Pm",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    sender: "other",
    text: "What About You Today?",
    time: "07:02 Pm",
    avatar: "https://via.placeholder.com/150",
  },
];

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
  avatar?: string;
};

const timeNow = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

const ChatMessages = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [userTextMessage, setUserTextMessage] = useState("");

  const handleMessageSend = () => {
    if (userTextMessage.trim() !== "") {
      const newMessage: Message = {
        id: Date.now(),
        sender: "me",
        text: userTextMessage,
        time: timeNow,
      };

      setMessages((prev) => [...prev, newMessage]);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      });
      setUserTextMessage("");
    }
  };

  return (
    <div
      className="  bg-white  rounded-md flex flex-col"
      style={{ height: "calc(100vh - 88px)" }}
    >
      <div className="flex gap-2 py-4 px-5 border-b-2 border-b-gray-200">
        <Image src={image} width={50} height={50} alt="header" />
        <div className="font-medium">
          <h1 className="2xl:text-xl">Kamran Khan</h1>
          <p className="text-xs">Typing...</p>
        </div>
      </div>
      {/* Messages container */}
      <div className="flex-1 flex flex-col p-4 overflow-y-auto hide-scrollbar">
        <div className="space-y-4">
          {messages.map((item) => (
            <div
              key={item.id}
              className={`flex ${
                item.sender === "me" ? "justify-end" : "justify-start"
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
                    item.sender === "me"
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
