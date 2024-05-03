import { cn } from "@/utils";
import { HTMLAttributes } from "react";

interface QuestionBoxProps extends HTMLAttributes<HTMLDivElement> {
  question: string;
  isBig?: boolean;
}

export const QuestionBox = ({
  question,
  isBig = false,
  className,
}: QuestionBoxProps) => {
  return (
    <div
      className={cn(
        "w-full bg-[#EAB95A] shadow-xl shadow-[#EAB95A] angle border-y-[3px] border-[#EAB95A] px-[3.5px] rounded-full flex justify-center items-center z-20 font-montserrat tablet:font-semibold font-normal tablet:text-2xl text-xs text-center",
        className
      )}
    >
      <div
        className={`angle shadow-inner bg-gradient-to-b from-[#6F006E] via-[#8A0089] to-[#6F006E] w-full h-full text-white flex justify-center items-center py-2 ${
          isBig ? " tablet:py-6" : " tablet:py-4"
        } rounded-full`}
      >
        <div className=" max-w-[60%] flex justify-center items-center">
          {question}
        </div>
      </div>
    </div>
  );
};
