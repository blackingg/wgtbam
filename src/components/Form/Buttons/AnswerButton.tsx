import { cn } from "@/utils/util";
import React from "react";

interface AnswerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btntext: string;
}

export const AnswerButton = ({ btntext, className }: AnswerButtonProps) => {
  return (
    <button
      className={cn(
        " font-bold font-montserrat text-2xl text-white rounded-[72px] shadow-2xl bg-[#086B35] px-8 py-4",
        className
      )}
    >
      {btntext}
    </button>
  );
};
