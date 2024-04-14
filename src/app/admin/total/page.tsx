"use client";
import { QuestionBox } from "@/components";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Home() {
  const [showPlay, setShowPlay] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setShowPlay(true);
    }, 2000);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center purplebg">
      <div className=" max-w-[300px] max-h-[300px] w-full h-full flex justify-center items-center mx-auto">
        <img
          src="/Images/logo2.svg"
          alt="Logo"
          className="max-w-[350px] max-h-[350px] w-full h-full"
        />
      </div>

      <h1 className=" mt-[6rem] font-montserrat font-medium text-5xl text-white/90 text-center">
        Total prize money won
      </h1>

      {showPlay && (
        <section onClick={() => router.push("/challenge")} className="">
          <div className=" mt-[4.5rem] relative">
            <div className=" bg-[#EAB95A] w-[100px] h-[4.5px] z-[1] absolute left-[0%] top-[50%] translate-y-[-50%] " />
            <QuestionBox
              question="#50,000"
              className=" px-[12px] z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] tablet:text-6xl"
              isBig={true}
            />
            <div className=" bg-[#EAB95A] w-[100px] h-[4.5px] z-[1] absolute right-[0%] top-[50%] translate-y-[-50%] " />
          </div>
        </section>
      )}
    </section>
  );
}
