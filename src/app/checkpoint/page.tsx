"use client";
import { BackgroundImage, ClickableMillionareBox, MillionareLogo } from "@/components";
import { useGoToChallengeOrTotal } from "@/helpers";
import { useFirebaseListener, useGoToQuestion, useWithdrawMoney } from "@/hooks";
import { useQuestionStore } from "@/zustand/store";
import Loading from "../loading";

export default function CheckpointPage() {
  const goToTotal = useQuestionStore((s) => s.goToTotal);
  const continueChallenge = useQuestionStore((s) => s.continueChallenge);
  const prizeLevel = useQuestionStore((s) => s.prizeLevel);

  const GoToQuestion = useGoToQuestion({ route: "/challenge" });
  const WithdrawMoney = useWithdrawMoney({ numPrizeLevel: prizeLevel, route: "/total" });

  useGoToChallengeOrTotal({ goToTotal, continueChallenge });
  useFirebaseListener();

  if (goToTotal || continueChallenge) return <Loading />;

  return (
    <main className="relative left-0 top-0 flex min-h-[100vh] w-screen flex-col justify-center gap-y-10 overflow-hidden">
      <BackgroundImage />
      <MillionareLogo />
      <h1 className="text-center font-montserrat text-xl font-semibold text-white/90 tablet:text-3xl ipad:text-[40px]">
        Checkpoint Confirmation
      </h1>
      <section className="flex w-full flex-col items-center gap-10">
        <ClickableMillionareBox text="Withdraw Prize Money" onClick={WithdrawMoney} />
        <ClickableMillionareBox text="Continue Playing" onClick={GoToQuestion} />
      </section>
    </main>
  );
}