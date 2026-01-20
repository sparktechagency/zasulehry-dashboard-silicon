/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "@/lib/SocketContext";
import { myFetch } from "@/utils/myFetch";
import ChatInput from "./ChartInput";
import CustomImage from "@/share/CustomImage";
import { Message } from "../supportUser/Message";
import MessagesContainer from "./MessagesContainer";

type Message = {
  sender: any;
  text?: string;
  image?: string;
  time?: string;
  chat?: string;
  createdAt: string;
};

interface Props {
  userId: string;
  token: string;
  userChatDetails: any;
}

const MESSAGES_PER_PAGE = 5;

const ChatMessages = ({ userId, userChatDetails }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [userTextMessage, setUserTextMessage] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [myProfile, setMyProfile] = useState<any>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // ------------------- GET MY PROFILE -------------------
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await myFetch("/users/profile");
      setMyProfile(res?.data);
    };
    fetchProfile();
  }, []);

  // ------------------- FETCH MESSAGES -------------------
  const fetchMessages = async (pageNumber: number, firstLoad = false) => {
    if (loading || !hasMore) return;

    setLoading(true);
    const res = await myFetch(
      `/messages/chat/${userId}?page=${pageNumber}&limit=${MESSAGES_PER_PAGE}`,
    );

    const messages = res?.data || [];

    if (messages.length < MESSAGES_PER_PAGE) setHasMore(false);

    setNewMessages((prev) => (firstLoad ? messages : [...messages, ...prev]));

    setLoading(false);

    // Scroll to bottom only on first load
    if (firstLoad) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
      }, 100);
    }
  };

  // Initial fetch
  useEffect(() => {
    setNewMessages([]);
    setPage(1);
    setHasMore(true);
    fetchMessages(1, true);
  }, [userId]);

  // ------------------- SCROLL TO TOP LOADING -------------------
  useEffect(() => {
    const div = containerRef.current;
    if (!div) return;

    const handleScroll = () => {
      if (div.scrollTop === 0 && hasMore && !loading) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMessages(nextPage);
      }
    };

    div.addEventListener("scroll", handleScroll);
    return () => div.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, loading]);

  const { socket } = useSocket();

  // get profile

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch("/users/profile");
      setMyProfile(res?.data);
    };
    fetchData();
  }, []);

  // console.log("userMessage", userMessage);
  useEffect(() => {
    const getMessages = async () => {
      const userMessage = await myFetch(`/messages/chat/${userId}`);
      setNewMessages(userMessage?.data || []);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    getMessages();
  }, [userId]);
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

      <div className="flex items-center gap-2 py-4 px-5 border-b-2 border-gray-200">
        <CustomImage
          src={userChatDetails?.anotherParticipant?.image}
          width={50}
          height={50}
          title="avatar"
        />
        <div className="font-medium">
          <h1 className="2xl:text-xl">
            {userChatDetails?.anotherParticipant?.name}
          </h1>
        </div>
      </div>

      {/* Messages */}

      <>
        <MessagesContainer
          containerRef={containerRef}
          newMessages={newMessages}
          myProfile={myProfile}
          loading={loading}
          previewImage={previewImage}
          bottomRef={bottomRef}
        />

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
      </>
    </div>
  );
};

export default ChatMessages;
