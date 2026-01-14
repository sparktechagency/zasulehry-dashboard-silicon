/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { useSocket } from "@/lib/SocketContext";
import { myFetch } from "@/utils/myFetch";
import avatarImg from "../../../public/user.png";
import ChatInput from "./ChartInput";
import { getImageSrc } from "@/components/share/getImage";
import dayjs from "dayjs";

type Message = {
  sender: any;
  text?: string;
  image?: string;
  time?: string;
  createdAt: string;
};

interface Props {
  userId: string;
  userMessage: Message[];
  token: string;
}

const ChatMessages = ({ userId, userMessage }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newMessages, setNewMessages] = useState<Message[]>(userMessage || []);
  const [userTextMessage, setUserTextMessage] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { socket } = useSocket();

  // console.log("userMessage", userMessage);

  // ------------------- SOCKET LISTENER -------------------
  useEffect(() => {
    if (!socket || !userId) return;
    const eventName = `getMessage`;
    const handleIncomingMessage = (message: Message) => {
      console.log("socketworking..", message);

      setNewMessages((prev) => [message, ...prev]);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    socket.on(eventName, handleIncomingMessage);
    return () => {
      socket.off(eventName, handleIncomingMessage);
    };
  }, [socket, userId]);

  // ------------------- SEND MESSAGE -------------------
  const handleMessageSend = async () => {
    if (!userTextMessage.trim() && !file) return;

    const formData = new FormData();
    if (userTextMessage) formData.append("text", userTextMessage);
    if (file) formData.append("image", file);
    formData.append("chat", userId);

    try {
      await myFetch("/messages/create", {
        method: "POST",
        body: formData,
      });

      setUserTextMessage("");
      setFile(null);
      setPreviewImage(null);

      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // ------------------- HANDLE IMAGE -------------------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB");
      return;
    }

    setFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div
      className="bg-white rounded-md flex flex-col"
      style={{ height: "calc(100vh - 88px)" }}
    >
      {/* Header */}
      {newMessages ? (
        <div className="flex items-center gap-2 py-4 px-5 border-b-2 border-gray-200">
          <Image
            src={newMessages[0]?.sender?.image}
            width={50}
            height={50}
            alt="avatar"
          />
          <div className="font-medium">
            <h1 className="2xl:text-xl">{newMessages[0]?.sender?.name}</h1>
          </div>
        </div>
      ) : (
        <p className="text-center p-2 font-medium">Select User</p>
      )}

      {/* Messages */}
      <div className="flex-1 flex flex-col p-4 overflow-y-auto hide-scrollbar">
        <div className="space-y-4">
          {newMessages
            ?.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
            ?.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item?.sender?.name ? "justify-end" : "justify-start"
                }`}
              >
                {item.sender === "other" && (
                  <Image
                    src={avatarImg}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}

                <div>
                  <div className="flex justify-end">
                    <p>{dayjs(item?.createdAt).format("ddd, MMM D")}</p>
                  </div>
                  {item.text && (
                    <div
                      className={`whitespace-pre-line px-4 py-1.5 rounded-lg text-xs 2xl:text-lg ${
                        item?.sender?.name
                          ? "bg-cyan-900 rounded-br-none text-white"
                          : "bg-[#B2D1D8] rounded-bl-none text-[#545454]"
                      }`}
                    >
                      {item.text}
                    </div>
                  )}
                  {item.image && (
                    <div className="mt-1">
                      <Image
                        src={getImageSrc(item?.image)}
                        alt={item.text || "Message image"}
                        width={200}
                        height={200}
                        className="rounded object-contain max-h-60"
                      />
                    </div>
                  )}
                  <div className="text-[#B0B0B0] text-right text-[9px] mt-1">
                    {item.time}
                  </div>
                </div>
              </div>
            ))}

          {/* Preview Image */}
          {previewImage && (
            <div className="flex justify-end mt-2">
              <Image
                src={previewImage}
                alt="preview"
                width={120}
                height={120}
                className="rounded object-contain"
              />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t">
        <ChatInput
          message={userTextMessage}
          setMessage={setUserTextMessage}
          onHandle={handleMessageSend}
          onHandleImage={handleImageUpload}
          fileInputRef={fileInputRef}
        />
      </div>
    </div>
  );
};

export default ChatMessages;
