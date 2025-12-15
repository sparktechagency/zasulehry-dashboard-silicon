import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-white selection:bg-primary selection:text-primary-foreground dark:bg-input/30  h-9 w-full min-w-0 rounded-md border border-[#E6E6E6]  px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7  file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-[12px] bg-[#1D7A8F] font-medium 2xl:text-sm xl:h-11",
        "",
        "",
        className
      )}
      {...props}
    />
  );
}

export { Input };
