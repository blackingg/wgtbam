import { values } from "@/utils";
import { Fragment } from "react";
import Image from "next/image";
import { useQuestionStore } from "@/zustand/store";
import { AskAudienceBtn, FiftyFiftyButton, PhoneFriendBtn } from "../Button";

// interface PrizePoolProps {
//   prizeLevel: number;
//   usedFifty: boolean;
//   usedAudience: boolean;
//   usedPhone: boolean;
// }

export const PrizePool = () => {
  const usedFifty = useQuestionStore((state) => state.usedFifty);
  const usedPhone = useQuestionStore((state) => state.usedPhone);
  const usedAudience = useQuestionStore((state) => state.usedAudience);
  const prizeLevel = useQuestionStore((state) => state.prizeLevel);

  return (
    <Fragment>
      <div className="relative space-y-2 rounded-2xl border border-white bg-opacity-50 bg-gradient-to-br from-[#121F3B] to-[#070E1D] px-8 py-4 font-montserrat text-sm font-normal ipad:px-[70px] ipad:py-[34px] ipad:text-3xl ipad:font-bold">
        {values.map((value) => (
          <div
            className={`flex h-full w-full items-center ${
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
              className={`absolute left-0 min-h-full min-w-full ${
                value.value === prizeLevel ? "flex" : "hidden"
              }`}
            />
            <span className="flex w-full max-w-[43px] justify-start ipad:justify-center">
              {value.value}.
            </span>
            <span className="flex justify-start pl-8">{value.amount}</span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[50px] right-[30px] flex flex-col items-center gap-6 tablet:right-[50px]">
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
