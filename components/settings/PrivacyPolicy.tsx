"use client";

import { useRef, useState } from "react";
import Button from "./Button";
import { JoditEditor } from "./JoditEditor";
import { useMediaQuery } from "react-responsive";

export default function PrivacyPolicy() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const isLargeScreen = useMediaQuery({ minWidth: 1536 });

  const handleOnSave = (value: string) => {};
  return (
    <section className="p-3">
      <div className="">
        <JoditEditor
          className="border-none "
          ref={editor}
          tabIndex={1}
          value={content}
          config={{
            height: isLargeScreen ? 600 : 470,
            theme: "",
            readonly: false,
            toolbarSticky: false,
          }}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>

      <Button
        onClick={() => handleOnSave(content)}
        htmlType="submit"
        className="btn-design font-bold px-10 text-[14px] lg:text-lg rounded-full transform transition-all duration-300 ease-in-out 0.5s ease  mt-4 text-white"
      >
        Publish
      </Button>
    </section>
  );
}
