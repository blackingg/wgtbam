"use client";
import { TelIcon, UsergroupIcon } from "@/components";
import { values } from "@/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const PrizeAdmin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("prizeLevel");
  // const currrentQuest = searchParams.get("currentQuestion");
  // console.log("LLLLLLLLLLLLL", typeof search);
  const prizeLevel = search ? parseInt(search, 10) : 0;
  // const newCurrQuest = currrentQuest ? parseInt(currrentQuest, 10) : 0;

  setTimeout(() => {
    router.push("/challenge");
  }, 3000);

  return (
    <section className="relative w-full min-h-screen flex justify-center items-center purplebg overflow-y-hidden">
      <div className=" bg-gradient-to-br from-[#121F3B] to-[#070E1D] bg-opacity-50 px-8 tablet:px-[70px] py-4 tablet:py-[34px] relative rounded-2xl border border-white font-montserrat font-normal text-sm tablet:font-bold tablet:text-3xl space-y-2">
        {values.map((value) => (
          <div
            className={` relative flex items-center w-full h-full ${
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
              draggable={false}
              className={` left-0 absolute min-w-full min-h-full cursor-not-allowed ${
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

      <div className=" absolute right-[50px] bottom-[50px] space-y-8">
        <div className=" font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] bg-white/90 shadow-md px-6 py-4">
          50/50
        </div>
        <div className=" flex justify-center items-center font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] bg-white/90 shadow-md px-6 py-4">
          <TelIcon />
        </div>
        <div className="flex justify-center items-center font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] bg-white/90 shadow-md px-6 py-4">
          <UsergroupIcon />
        </div>
      </div>
    </section>
  );
};

export default PrizeAdmin;
