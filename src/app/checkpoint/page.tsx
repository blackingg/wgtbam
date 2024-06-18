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

const CheckpointUser = () =>
  // { searchParams }: { searchParams: { prizeLevel: string } }
  {
    // const numPrizeLevel = parseInt(searchParams.prizeLevel, 10);

    const goToTotal = useQuestionStore((state) => state.goToTotal);
    const continueChallenge = useQuestionStore(
      (state) => state.continueChallenge,
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
      <main className="relatve left-0 top-0 flex min-h-[100dvh] w-screen flex-col justify-center gap-y-10 overflow-hidden">
        <BackgroundImage />

        <MillionareLogo />

        <h1 className="text-center font-montserrat text-xl font-semibold text-white/90 tablet:text-3xl ipad:text-[40px]">
          Checkpoint Confirmation
        </h1>
        <section className="flex w-full flex-col items-center gap-10">
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
