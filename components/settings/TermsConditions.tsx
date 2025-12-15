"use client";

import { useRef, useState } from "react";
import Button from "./Button";
import { JoditEditor } from "./JoditEditor";
import { useMediaQuery } from "react-responsive";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";

export default function TermsCondition({ data }: { data: string }) {
  const editor = useRef(null);
  const [content, setContent] = useState(data || "");

  const isLargeScreen = useMediaQuery({ minWidth: 1536 });

  const handleOnSave = async (value: string) => {
    if (!value?.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      const res = await myFetch("/disclaimers/create-update", {
        method: "POST",
        body: { content: value, type: "terms-and-conditions" },
      });

      if (res?.success) {
        toast.success(res.message || "Updated successfully");
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <section className="p-3">
      <div className="">
        <div className="">
          <JoditEditor
            className="border-none "
            ref={editor}
            value={content}
            config={{
              height: isLargeScreen ? 600 : 470,
              theme: "",
              readonly: false,
            }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </div>

      <Button
        onClick={() => handleOnSave(content)}
        htmlType="submit"
        className="btn-design font-bold px-10 text-[14px] 2xl:text-lg rounded-full transform transition-all duration-300 ease-in-out 0.5s ease  mt-4 text-white"
      >
        Publish
      </Button>
    </section>
  );
}
