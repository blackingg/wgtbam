"use client";

import {
  BackgroundImage,
  ClickableMillionareBox,
  MillionareLogo,
} from "@/components";
import { GoToChallengeOrTotal } from "@/helpers";
import {
  useFirebaseListener,
  useGoToQuestion,
  useWithdrawMoney,
} from "@/hooks";
import { useQuestionStore } from "@/zustand/store";
import Loading from "../loading";

const CheckpointUser = (
  // { searchParams }: { searchParams: { prizeLevel: string } }
) => {
  // const numPrizeLevel = parseInt(searchParams.prizeLevel, 10);

  const goToTotal = useQuestionStore((state) => state.goToTotal);
  const continueChallenge = useQuestionStore(
    (state) => state.continueChallenge
  );
  const prizeLevel = useQuestionStore((state) => state.prizeLevel);

  const GoToQuestion = useGoToQuestion({ route: "/challenge" });
  const WithdrawMoney = useWithdrawMoney({
    numPrizeLevel: prizeLevel,
    route: "/total",
  });

  GoToChallengeOrTotal({ goToTotal, continueChallenge });

  useFirebaseListener();

  if (goToTotal === true || continueChallenge === true) {
    return <Loading />;
  }

  return (
    <main className="top-0 left-0 overflow-hidden relatve w-screen min-h-screen flex flex-col gap-y-10 justify-center ">
      <BackgroundImage />

      <MillionareLogo />

      <h1 className=" font-montserrat font-semibold text-xl tablet:text-3xl ipad:text-[40px] text-white/90 text-center">
        Checkpoint Confirmation
      </h1>
      <section className="w-full flex flex-col items-center gap-10">
        <ClickableMillionareBox
          text="Withdraw Prize Money"
          onClick={WithdrawMoney}
        />
        <ClickableMillionareBox
          text="Continue Playing"
          onClick={GoToQuestion}
        />
      </section>
    </main>
  );
};

export default CheckpointUser;
