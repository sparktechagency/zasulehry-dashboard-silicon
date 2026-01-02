import { Textarea } from "@/components/ui/textarea";
import { Image as Movie, SendHorizonal } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  onHandle: () => void;
  onHandleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const ChatInput = ({
  message,
  setMessage,
  onHandle,
  onHandleImage,
  fileInputRef,
}: Props) => {
  return (
    <div className="flex items-center p-2 space-x-2">
      {/* Text Input */}
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm resize-none"
        placeholder="Type…"
      />

      {/* Image Upload */}
      <div>
        <button
          type="button"
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
          onClick={() => fileInputRef.current?.click()}
        >
          <Movie />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onHandleImage}
          className="hidden"
        />
      </div>

      {/* Send Button */}
      <button
        type="button"
        className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
        onClick={onHandle}
      >
        <SendHorizonal />
      </button>
    </div>
  );
};

export default ChatInput;
