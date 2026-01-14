"use client";

import { SocketProvider } from "@/lib/SocketContext";
import { getToken } from "@/utils/getToken";
import { useEffect, useState } from "react";

export default function SocketAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const fetchSocket = async () => {
      const storedToken = await getToken(); // or cookies
      console.log("get token", storedToken);

      if (storedToken) {
        setToken(storedToken);
      }
    };
    fetchSocket();
  }, []);

  if (!token) return children; // or loading spinner

  return <SocketProvider token={token}>{children}</SocketProvider>;
}
