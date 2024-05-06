"use client";
import {
  BackgroundImage,
  MillionareLogo,
  NonClickableMillionareBox,
} from "@/components";
import { getAmount } from "@/helpers";
import { useFirebaseListener } from "@/hooks";
import { useQuestionStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
//@ts-ignore
import Confetti from "react-confetti";

export default function Home({
  searchParams,
}: {
  searchParams: { prizeLevel: string };
}) {
  const router = useRouter();
  const { goToHome, goToTotal, updateDataInFirebase } = useQuestionStore();
  // const numPrizeLevel = parseInt(searchParams.prizeLevel, 10);
  const numPrizeLevel = useQuestionStore((state) => state.prizeLevel);
  const [pieces, setPieces] = useState(200);

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 3000);
  };

  useEffect(() => {
    stopConfetti();
  }, []);

  useFirebaseListener();

  useEffect(() => {
    const Run = async () => {
      if (goToTotal === true) {
        await updateDataInFirebase({ goToTotal: false });
      }
    };

    Run();

    goToHome === true && goToTotal === false && router.push("/");
  }, [goToHome, goToTotal]);

  console.log("Home", goToHome);

  return (
    <main className="top-0 left-0 overflow-hidden relatve w-screen min-h-screen flex flex-col justify-center gap-10">
      <BackgroundImage />
      <Confetti
        gravity={0.2}
        numberOfPieces={pieces}
        className="lConfetti w-screen h-screen grid place-items-center mx-auto"
      />
      <MillionareLogo />
      <h1 className="  font-montserrat font-medium text-xl tablet:text-3xl ipad:text-5xl text-white/90 text-center">
        Total prize money won
      </h1>
      <NonClickableMillionareBox
        text={getAmount(numPrizeLevel) ?? "₦0"}
        className2=" ipad:text-[50px]"
        className="ipad:py-[40px]"
      />
    </main>
  );
}
