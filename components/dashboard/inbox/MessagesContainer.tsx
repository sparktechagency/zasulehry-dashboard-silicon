import { getImageSrc } from "@/components/share/getImage";
import dayjs from "dayjs";
import Image from "next/image";
import avatarImg from "../../../public/user.png";

export default function MessagesContainer({
  containerRef,
  newMessages,
  previewImage,
  bottomRef,
}: any) {
  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col p-4 overflow-y-auto hide-scrollbar"
    >
      <div className="space-y-4">
        {newMessages
          ?.sort(
            (a: any, b: any) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          )
          ?.map((item: any, index: number) => (
            <div
              key={index}
              className={`flex ${
                item?.isMyMessage ? "justify-end" : "justify-start"
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
                <div className="flex justify-end text-gray-400">
                  <p>{dayjs(item?.createdAt).format("ddd, MMM D")}</p>
                </div>
                {item.text && (
                  <div
                    className={`whitespace-pre-line px-4 py-1.5 rounded-lg text-xs 2xl:text-lg flex  ${
                      item?.isMyMessage
                        ? "bg-cyan-900 rounded-br-none text-white"
                        : "bg-[#B2D1D8] rounded-bl-none text-[#545454] "
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
  );
}
