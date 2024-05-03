"use client";
import {
  BackgroundImage,
  ConfirmationBtn,
  MillionareLogo,
  NonClickableMillionareBox,
} from "@/components";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useFirebaseListener } from "@/hooks";
import { getAmount } from "@/helpers";
import { ResetQuiz } from "@/utils";

export default function Home({
  searchParams,
}: {
  searchParams: { prizeLevel: string };
}) {
  const numPrizeLevel = parseInt(searchParams.prizeLevel, 10);

  const [pieces, setPieces] = useState(200);

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 3000);
  };

  const [isClient, setIsClient] = useState(false);

  const { updateDataInStore, updateDataInFirebase } = useFirebaseListener();

  const resetObj = ResetQuiz();

  useEffect(() => {
    setIsClient(true);
    stopConfetti();
  }, []);

  return (
    <section className="relatve w-screen min-h-screen flex flex-col justify-center gap-10">
      <BackgroundImage />
      {isClient && (
        <Confetti
          gravity={0.2}
          numberOfPieces={pieces}
          className="lConfetti w-screen h-screen grid place-items-center mx-auto"
        />
      )}
      <MillionareLogo />
      <h1 className="  font-montserrat font-medium text-xl tablet:text-3xl ipad:text-5xl text-white/90 text-center">
        Total prize money won
      </h1>

      <NonClickableMillionareBox
        text={getAmount(numPrizeLevel) ?? "₦0"}
        className2=" ipad:text-[50px]"
        className="ipad:py-[40px]"
      />
      <div className=" flex justify-center items-center w-full">
        <Link
          href="/admin"
          onClick={() => {
            updateDataInFirebase(resetObj);
          }}
        >
          <ConfirmationBtn
            btntext="Reset Quiz"
            className=" bg-[#FFFFFF] text-[#8A0089]"
          />
        </Link>
      </div>
    </section>
  );
}
