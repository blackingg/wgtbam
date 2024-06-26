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

export default function Home() {
  //   {
  //   searchParams,
  // }: {
  //   searchParams: { prizeLevel: string };
  // }
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase,
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

  const AUTH_TOKEN_KEY = "authToken";
  const AUTH_TOKEN_VALUE = "admin0987";

  const handleLogout = async () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  };

  useFirebaseListener();

  return (
    <main className="relatve left-0 top-0 flex min-h-[100vh] w-screen flex-col justify-center gap-10 overflow-hidden">
      <BackgroundImage />
      {client && (
        <Confetti
          gravity={0.2}
          numberOfPieces={pieces}
          className="lConfetti mx-auto grid h-[100vh] w-screen place-items-center"
        />
      )}
      <MillionareLogo />
      <h1 className="text-center font-montserrat text-xl font-medium text-white/90 tablet:text-3xl ipad:text-5xl">
        Total prize money won
      </h1>

      <NonClickableMillionareBox
        text={getAmount(numPrizeLevel) ?? "₦0"}
        className2=" ipad:text-[50px]"
        className="ipad:py-[40px]"
      />
      <div className="z-10 flex w-full items-center justify-center">
        <ConfirmationBtn
          onClick={async () => {
            await updateDataInFirebase(resetObj);
            await handleLogout();
            router.push("/admin");
          }}
          btntext="Reset Quiz"
          className="bg-[#FFFFFF] text-[#8A0089]"
        />
      </div>
    </main>
  );
}
