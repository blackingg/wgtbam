import { NonClickableMillionareBtnProps } from "@/types";
import { cn } from "@/utils";

export const MillionareContainer = ({
  text,
  className,
  className2,
  ...props
}: NonClickableMillionareBtnProps) => {
  return (
    <div
      {...props}
      className={
        "w-full shadow-xl bg-[#EAB95A] shadow-[#EAB95A] angle border-y-[3px] border-[#EAB95A] px-[5px] rounded-full flex justify-center items-center z-20 font-montserrat tablet:font-semibold font-normal ipad:text-2xl text-xs text-center"
      }
    >
      <span
        className={cn(
          ` bg-gradient-to-b from-[#6F006E] via-[#8A0089] to-[#6F006E] angle shadow-inner w-full h-full text-white flex justify-center items-center py-2 ipad:py-[30px] rounded-full min-h-[2rem] ipad:min-h-[4rem]`,
          className
        )}
      >
        <span
          className={cn(
            ` max-w-[60%] flex justify-center items-center font-montserrat tablet:font-semibold font-normal tablet:text-2xl text-xs text-center shadow-inner`,
            className2
          )}
        >
          {text}
        </span>
      </span>
    </div>
  );
};
