"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_IMAGE_URL as string, {
      transports: ["websocket"],
      withCredentials: true,
      extraHeaders: {
        auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjMwYTgzMTY3NGVmOGFlMWM0MDNjOCIsInJvbGUiOiJFbXBsb3llciIsImVtYWlsIjoicmFoYWR1bGxhaDEwQGdtYWlsLmNvbSIsImlhdCI6MTc2NzIzOTMzMywiZXhwIjoxNzY3ODQ0MTMzfQ.5eomHhmdrrMdLwPkZshnCOenzd5yI_WWvekQa-nxbiM",
      },
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
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
