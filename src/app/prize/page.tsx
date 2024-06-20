"use client";
import { TelIcon, UsergroupIcon } from "@/components";
import { values } from "@/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const PrizeUser = () => {
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
    <section className="purplebg relative flex min-h-[100vh] w-full items-center justify-center overflow-y-hidden">
      <div className="relative space-y-2 rounded-2xl border border-white bg-opacity-50 bg-gradient-to-br from-[#121F3B] to-[#070E1D] px-8 py-4 font-montserrat text-sm font-normal tablet:px-[70px] tablet:py-[34px] tablet:text-3xl tablet:font-bold">
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
              src="/Images/rect.svg"
              alt=""
              className={`absolute left-0 min-h-full min-w-full ${
                value.value === prizeLevel ? "flex" : "hidden"
              }`}
            />
            <span className="flex w-full max-w-[43px] justify-start tablet:justify-center">
              {value.value}.
            </span>
            <span className="flex justify-start pl-8">{value.amount}</span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[50px] right-[50px] space-y-8">
        <div className="rounded-[72px] bg-white/90 px-6 py-4 font-montserrat text-3xl font-bold text-[#8A0089] shadow-md">
          50/50
        </div>
        <div className="flex items-center justify-center rounded-[72px] bg-white/90 px-6 py-4 font-montserrat text-3xl font-bold text-[#8A0089] shadow-md">
          <TelIcon />
        </div>
        <div className="flex items-center justify-center rounded-[72px] bg-white/90 px-6 py-4 font-montserrat text-3xl font-bold text-[#8A0089] shadow-md">
          <UsergroupIcon />
        </div>
      </div>
    </section>
  );
};

export default PrizeUser;
