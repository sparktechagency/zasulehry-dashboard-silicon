"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
});

export const SocketProvider = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  console.log("token----------------", token);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_IMAGE_URL as string, {
      transports: ["websocket"],
      withCredentials: true,
      auth: { token },
    });

    console.log("new socket", newSocket);

    // ✅ connection success
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    // ❌ disconnected
    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    // ❌ connection error
    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = ({ token }: { token: string }) =>
  useContext(SocketContext);
