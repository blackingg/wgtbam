import { BtnProps } from "@/types";
import { cn } from "@/utils";
import React from "react";

export const FiftyFiftyButton = ({ className, ...props }: BtnProps) => {
  return (
    <button
      {...props}
      className={cn(
        ` bg-white/90 max-w-[50px] tablet:max-w-[100px]  max-h-[25px] tablet:max-h-[50px] w-full h-full flex justify-center items-center font-montserrat font-bold text-xs tablet:text-xl text-[#8A0089] rounded-[72px] shadow-md px-6 py-4
      `,
        className
      )}
    >
      50/50
    </button>
  );
};
