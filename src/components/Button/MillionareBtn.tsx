import { cn } from "@/utils";
import React from "react";

export interface MillionareBtnProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const MillionareBtn = ({
  text,
  className,
  ...props
}: MillionareBtnProps) => {
  return (
    <button
      {...props}
      className={
        "w-full shadow-xl bg-[#EAB95A] shadow-[#EAB95A] angle border-y-[3px] border-[#EAB95A] px-[5px] rounded-full flex justify-center items-center z-20 font-montserrat tablet:font-semibold font-normal ipad:text-2xl text-xs text-center"
      }
    >
      <span
        className={cn(
          ` bg-gradient-to-b from-[#6F006E] via-[#8A0089] to-[#6F006E] angle shadow-inner w-full h-full text-white flex justify-center items-center py-2 ipad:py-9 rounded-full min-h-[2rem] ipad:min-h-[4rem]`,
          className
        )}
      >
        <span className=" max-w-[60%] flex justify-center items-center text-lg ipad:text-[32px] shadow-inner">
          {text}
        </span>
      </span>
    </button>
  );
};
