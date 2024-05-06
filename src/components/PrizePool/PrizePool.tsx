import { values } from "@/utils";
import { Fragment } from "react";
import { AskAudienceBtn, FiftyFiftyButton, PhoneFriendBtn } from "..";
import Image from "next/image";

interface PrizePoolProps {
  prizeLevel: number;
  usedFifty: boolean;
  usedAudience: boolean;
  usedPhone: boolean;
}

export const PrizePool = ({
  prizeLevel,
  usedFifty,
  usedAudience,
  usedPhone,
}: PrizePoolProps) => {
  return (
    <Fragment>
      <div className=" bg-gradient-to-br from-[#121F3B] to-[#070E1D] bg-opacity-50 px-8 ipad:px-[70px] py-4 ipad:py-[34px] relative rounded-2xl border border-white font-montserrat font-normal text-sm ipad:font-bold ipad:text-3xl space-y-2">
        {values.map((value) => (
          <div
            className={`flex items-center w-full h-full ${
              value.value !== 5 && value.value !== 10 && value.value !== 15
                ? "text-[#F88008]"
                : "text-white"
            }`}
            key={value.value}
          >
            <Image
              width={100}
              height={100}
              priority
              quality={100}
              placeholder="blur"
              blurDataURL="/Images/rect.svg"
              sizes="100%"
              src="/Images/rect.svg"
              alt=""
              className={` left-0 absolute min-w-full min-h-full ${
                value.value === prizeLevel ? "flex" : "hidden"
              }`}
            />
            <span className=" flex justify-start ipad:justify-center max-w-[43px] w-full">
              {value.value}.
            </span>
            <span className=" flex justify-start pl-8">{value.amount}</span>
          </div>
        ))}
      </div>

      <div className=" absolute right-[30px] tablet:right-[50px] bottom-[50px] flex flex-col gap-6 items-center">
        <FiftyFiftyButton
          disabled
          className={`${usedFifty && `bg-[#EB1212]`}`}
        />
        <PhoneFriendBtn disabled className={`${usedPhone && `bg-[#EB1212]`}`} />
        <AskAudienceBtn
          disabled
          className={`${usedAudience && `bg-[#EB1212]`}`}
        />
      </div>
    </Fragment>
  );
};
