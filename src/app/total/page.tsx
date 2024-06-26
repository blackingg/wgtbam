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

export default function Home() {
  //   {
  //   searchParams,
  // }: {
  //   searchParams: { prizeLevel: string };
  // }
  const router = useRouter();
  const goToTotal = useQuestionStore((state) => state.goToTotal);
  const goToHome = useQuestionStore((state) => state.goToHome);
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase,
  );
  // const numPrizeLevel = parseInt(searchParams.prizeLevel, 10);
  const numPrizeLevel = useQuestionStore((state) => state.prizeLevel);
  const clearStorage = useQuestionStore((state) => state.clearStorage);
  const [pieces, setPieces] = useState(200);
  const [client, setIsClient] = useState(false);

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 3000);
  };
  const AUTH_TOKEN_KEY = "authToken";
  const AUTH_TOKEN_VALUE = "admin0987";
  const handleLogout = async () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  };

  useEffect(() => {
    stopConfetti();
    setIsClient(true);
    const Run = async () => {
      await handleLogout();
    };
    Run();
  }, []);

  useEffect(() => {
    const Run = async () => {
      if (goToTotal === true) {
        await updateDataInFirebase({ goToTotal: false });
      }
    };

    Run();
    goToHome === true && goToTotal === false && router.push("/");
  }, [goToHome, goToTotal, clearStorage]);

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
    </main>
  );
}
