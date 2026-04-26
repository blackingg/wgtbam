"use client";
import {
  ChallengeSkeleton,
  Lifelines,
  MillionareLogo,
  UserPrizeModal,
} from "@/components";
import { HandleQuestAnswer, HandleQuestionUpdate } from "@/helpers";
import { useFirebaseListener } from "@/hooks";
import { useFiftyClick } from "@/hooks/useFiftyClick";
import { useQuestionStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export default function ChallengePage() {
  const router = useRouter();
  const userRole = "player";

  const goToTotal = useQuestionStore((s) => s.goToTotal);
  const usedFifty = useQuestionStore((s) => s.usedFifty);
  const usedPhone = useQuestionStore((s) => s.usedPhone);
  const usedAudience = useQuestionStore((s) => s.usedAudience);
  const isAnswered = useQuestionStore((s) => s.isAnswered);
  const prizeLevel = useQuestionStore((s) => s.prizeLevel);
  const selectedAnswer = useQuestionStore((s) => s.selectedAnswer);
  const openPrize = useQuestionStore((s) => s.openPrize);
  const isConfirmed = useQuestionStore((s) => s.isConfirmed);
  const finallyIsCorrectAns = useQuestionStore((s) => s.finallyIsCorrectAns);
  const revealCorrectAnswer = useQuestionStore((s) => s.revealCorrectAnswer);
  const showRevealCorrect = useQuestionStore((s) => s.showRevealCorrect);
  const showCheckpoint = useQuestionStore((s) => s.showCheckpoint);
  const continueChallenge = useQuestionStore((s) => s.continueChallenge);
  const updateDataInFirebase = useQuestionStore((s) => s.updateDataInFirebase);
  const answer = useQuestionStore((s) => s.answer);
  const options = useQuestionStore((s) => s.options);
  const question = useQuestionStore((s) => s.question);

  const HandleFiftyFiftyClick = async () => {
    const halfedAnswers = useFiftyClick({ options, answer, updateDataInFirebase });
    if (halfedAnswers) await updateDataInFirebase(halfedAnswers);
  };

  const handleAnswerClick = HandleQuestAnswer({
    selectedOption: selectedAnswer,
    realQuestAns: answer as string,
    prizeLevel,
    updateDataInFirebase,
  });

  useEffect(() => {
    if (!goToTotal) {
      HandleQuestionUpdate({
        revealCorrectAnswer,
        isConfirmed,
        selectedAnswer,
        finallyIsCorrectAns,
        showCheckpoint,
        realQuestAns: answer as string,
        prizeLevel,
        showRevealCorrect,
        router,
        updateDataInFirebase,
        user: userRole,
        continueChallenge,
        openPrize,
      });
      if (showCheckpoint) router.push("/checkpoint");
    } else {
      router.push("/total");
    }
  }, [revealCorrectAnswer, isConfirmed, selectedAnswer, finallyIsCorrectAns, showCheckpoint, goToTotal]);

  useFirebaseListener();

  if (openPrize) return <UserPrizeModal openPrize={openPrize} />;

  return showCheckpoint ? (
    <Loading />
  ) : (
    <main
      style={{ backgroundImage: `url("/Images/purplebg.png")` }}
      className="relative flex min-h-[100vh] min-w-full flex-col justify-center gap-3 bg-cover pt-4 largerdesktop:gap-10"
    >
      <div className="relative h-full w-full">
        <div className="mx-auto flex h-full max-h-[150px] w-full max-w-[150px] items-center justify-center tablet:max-h-[250px] tablet:max-w-[250px]">
          <MillionareLogo />
          <Lifelines
            usedFifty={usedFifty}
            usedPhone={usedPhone}
            usedAudience={usedAudience}
            isAnswered={isAnswered}
            handleFiftyFiftyClick={HandleFiftyFiftyClick}
          />
        </div>
      </div>
      {question !== null && answer !== null && options !== null && (
        <ChallengeSkeleton
          question={question}
          option1={options.a}
          option2={options.b}
          option3={options.c}
          option4={options.d}
          answer={answer}
          handleAnswerClick={handleAnswerClick}
          selectedAnswer={selectedAnswer}
          isConfirm={isConfirmed}
          revealedCorrect={revealCorrectAnswer}
          actualCorrectAns={finallyIsCorrectAns}
          showRevealCorrect={showRevealCorrect}
        />
      )}
    </main>
  );
}