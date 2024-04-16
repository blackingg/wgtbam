"use client";
import { TelIcon, UsergroupIcon } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("prizeLevel");
  const currrentQuest = searchParams.get("currentQuestion");
  // console.log("LLLLLLLLLLLLL", typeof search);
  const prizeLevel = search ? parseInt(search, 10) : 0;
  const newCurrQuest = currrentQuest ? parseInt(currrentQuest, 10) : 0;

  setTimeout(() => {
    router.push("/challenge");
  }, 3000);

  return (
    <section className="relative w-full min-h-screen flex justify-center items-center purplebg overflow-y-hidden">
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

export default page;

// const AngledBox = ({
//   children,
//   isshow = false,
// }: {
//   isshow?: boolean;
//   children?: ReactNode;
// }) => {
//   return (
//     // <div
//     //   className={`${
//     //     isshow ? "flex" : "hidden"
//     //   } w-full absolute angle border-y-[2px] bg-[#EAB95A] border-[#EAB95A] px-[2px] rounded-full justify-center items-center z-20 font-montserrat font-semibold text-2xl text-center`}
//     // >
//     //   <div className="angle w-full h-full text-white flex px-5 py-6 justify-center items-center rounded-full bg-[#070E1D]">
//     //   </div>
//     // </div>

//   );
// };

const values = [
  { value: 15, amount: "₦1,000,000" },
  { value: 14, amount: "₦500,000" },
  { value: 13, amount: "₦300,000" },
  { value: 12, amount: "₦150,000" },
  { value: 11, amount: "₦75,000" },
  { value: 10, amount: "₦50,000" },
  { value: 9, amount: "₦30,000" },
  { value: 8, amount: "₦20,000" },
  { value: 7, amount: "₦10,000" },
  { value: 6, amount: "₦7,000" },
  { value: 5, amount: "₦5,000" },
  { value: 4, amount: "₦3,000" },
  { value: 3, amount: "₦2,000" },
  { value: 2, amount: "₦1,000" },
  { value: 1, amount: "₦500" },
];
