import { TelIcon, UsergroupIcon } from "@/components";
import { values } from "@/utils";

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
    <>
      {/* <section className="w-full min-h-screen flex justify-center items-center purplebg relative overflow-y-hidden"> */}
      <div className=" bg-gradient-to-br from-[#121F3B] to-[#070E1D] bg-opacity-50 px-8 tablet:px-[70px] py-4 tablet:py-[34px] relative rounded-2xl border border-white font-montserrat font-normal text-sm tablet:font-bold tablet:text-3xl space-y-2">
        {values.map((value) => (
          <div
            className={`flex items-center w-full h-full ${
              value.value !== 5 && value.value !== 10 && value.value !== 15
                ? "text-[#F88008]"
                : "text-white"
            }`}
            key={value.value}
          >
            <img
              src="/Images/rect.svg"
              alt=""
              className={` left-0 absolute min-w-full min-h-full ${
                value.value === prizeLevel ? "flex" : "hidden"
              }`}
            />
            <span className=" flex justify-start tablet:justify-center max-w-[43px] w-full">
              {value.value}.
            </span>
            <span className=" flex justify-start pl-8">{value.amount}</span>
          </div>
        ))}
      </div>

      {/* <div className=" absolute right-[50px] bottom-[50px] space-y-8">
        <div className=" font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] bg-white/90 shadow-md px-6 py-4">
          50/50
        </div>
        <div className=" flex justify-center items-center font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] bg-white/90 shadow-md px-6 py-4">
          <TelIcon />
        </div>
        <div className="flex justify-center items-center font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] bg-white/90 shadow-md px-6 py-4">
          <UsergroupIcon />
        </div>
      </div> */}

      <div className=" absolute right-[50px] bottom-[50px] flex flex-col gap-6 items-center">
        <button
          disabled
          className={`${
            usedFifty ? "bg-[#EB1212]" : "bg-white/90"
          } max-w-[50px] tablet:max-w-[100px]  max-h-[25px] tablet:max-h-[50px] w-full h-full flex justify-center items-center font-montserrat font-bold text-xs tablet:text-xl text-[#8A0089] rounded-[72px] shadow-md px-6 py-4`}
        >
          50/50
        </button>
        <button
          disabled
          className={`${
            usedPhone ? "bg-[#EB1212]" : "bg-white/90"
          }  max-w-[50px] tablet:max-w-[100px]  max-h-[25px] tablet:max-h-[50px] w-full h-full flex justify-center items-center font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] shadow-md px-6 py-4`}
        >
          <img
            src="/Images/phoneIcon.png"
            alt=""
            className=" max-w-[20px] tablet:max-w-[30px] max-h-[20px] tablet:max-h-[30px]"
          />
        </button>
        <button
          disabled
          className={`${
            usedAudience ? "bg-[#EB1212]" : "bg-white/90"
          } max-w-[50px] tablet:max-w-[100px]  max-h-[25px] tablet:max-h-[50px] w-full h-full flex justify-center items-center font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] shadow-md px-6 py-4`}
        >
          <img
            src="/Images/userGroupIcon.png"
            alt=""
            className=" max-w-[20px] tablet:max-w-[30px] max-h-[20px] tablet:max-h-[30px]"
          />
        </button>
      </div>
      {/* </section> */}
    </>
  );
};
