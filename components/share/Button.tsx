import React from "react";

export default function Button({
  type,
  className,
  children,
  onClick,
}: {
  type?: "submit" | "reset" | "button";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      className={`w-full font-semibold h-9 cursor-pointer  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
