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

const page = ({ searchParams }: { searchParams: { prizeLevel: string } }) => {
  // const numPrizeLevel = parseInt(searchParams.prizeLevel, 10);

  const { goToTotal, continueChallenge, prizeLevel } = useQuestionStore();

  const GoToQuestion = useGoToQuestion({ route: "/admin/challenge" });
  const WithdrawMoney = useWithdrawMoney({
    numPrizeLevel: prizeLevel,
    route: "/admin/total",
  });

  GoToChallengeOrTotal({ goToTotal, continueChallenge, user: "admin" });

  useFirebaseListener();

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

export default page;
