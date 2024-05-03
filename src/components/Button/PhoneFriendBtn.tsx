import { BtnProps } from "@/types";
import { cn } from "@/utils";
import Image from "next/image";

export const PhoneFriendBtn = ({ className, ...props }: BtnProps) => {
  return (
    <button
      {...props}
      className={cn(
        ` bg-white/90 max-w-[50px] tablet:max-w-[100px]  max-h-[25px] tablet:max-h-[50px] w-full h-full flex justify-center items-center font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] shadow-md px-6 py-4`,
        className
      )}
    >
      <Image
        src="/Images/phoneIcon.png"
        alt="Phone a Friend Button Icon"
        width={30}
        height={30}
        quality={100}
        priority
        draggable={false}
        sizes="20px, 30px"
        className=" max-w-[20px] tablet:max-w-[30px] max-h-[20px] tablet:max-h-[30px] cursor-not-allowed"
      />
    </button>
  );
};
