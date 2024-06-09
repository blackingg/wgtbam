"use client";
import {
  BackgroundImage,
  ConfirmationBtn,
  MillionareLogo,
  NonClickableMillionareBox,
} from "@/components";
import { useEffect, useState } from "react";
//@ts-ignore
import Confetti from "react-confetti";
import { useFirebaseListener } from "@/hooks";
import { getAmount } from "@/helpers";
import { resetObj } from "@/utils";
import { useQuestionStore } from "@/zustand/store";
import { useRouter } from "next/navigation";

export default function Home(
//   {
//   searchParams,
// }: {
//   searchParams: { prizeLevel: string };
// }
) {
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );

  const router = useRouter();

  // const numPrizeLevel = parseInt(searchParams.prizeLevel, 10);
  const numPrizeLevel = useQuestionStore((state) => state.prizeLevel);

  const [pieces, setPieces] = useState(200);
  const [client, setIsClient] = useState(false);

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 3000);
  };

  useEffect(() => {
    stopConfetti();
    setIsClient(true);
  }, []);

  useFirebaseListener();

  return (
    <main className="top-0 left-0 overflow-hidden relatve w-screen min-h-screen flex flex-col justify-center gap-10">
      <BackgroundImage />
      {client && (
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
      <div className=" flex justify-center items-center w-full z-10">
        <ConfirmationBtn
          onClick={async () => {
            await updateDataInFirebase(resetObj);
            router.push("/admin");
          }}
          btntext="Reset Quiz"
          className=" bg-[#FFFFFF] text-[#8A0089]"
        />
      </div>
    </main>
  );
}
