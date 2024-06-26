"use client";
import {
  ChallengeSkeleton,
  Lifelines,
  MillionareLogo,
  ProtectedWrapper,
  UserPrizeModal,
} from "@/components";
import { HandleQuestAnswer, HandleQuestionUpdate } from "@/helpers";
import { useFirebaseListener } from "@/hooks";
import { useFiftyClick } from "@/hooks/useFiftyClick";
import { useQuestionStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const userRole = "player";
  const router = useRouter();
  let currentuserlevel: number = 0;

  const goToTotal = useQuestionStore((state) => state.goToTotal);
  const usedFifty = useQuestionStore((state) => state.usedFifty);
  const usedPhone = useQuestionStore((state) => state.usedPhone);
  const usedAudience = useQuestionStore((state) => state.usedAudience);
  const isAnswered = useQuestionStore((state) => state.isAnswered);
  const prizeLevel = useQuestionStore((state) => state.prizeLevel);
  const selectedAnswer = useQuestionStore((state) => state.selectedAnswer);
  const openPrize = useQuestionStore((state) => state.openPrize);
  const isConfirmed = useQuestionStore((state) => state.isConfirmed);
  const finallyIsCorrectAns = useQuestionStore(
    (state) => state.finallyIsCorrectAns,
  );
  const revealCorrectAnswer = useQuestionStore(
    (state) => state.revealCorrectAnswer,
  );
  const showRevealCorrect = useQuestionStore(
    (state) => state.showRevealCorrect,
  );
  const showCheckpoint = useQuestionStore((state) => state.showCheckpoint);
  const continueChallenge = useQuestionStore(
    (state) => state.continueChallenge,
  );
  // const updateDataInFirebase = useQuestionStore(
  //   useShallow((state) => state.updateDataInFirebase),
  // );

  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase,
  );

  const answer = useQuestionStore((state) => state.answer);
  const options = useQuestionStore((state) => state.options);
  const question = useQuestionStore((state) => state.question);

  const HandleFiftyFiftyClick = async () => {
    const halfedAnswers = useFiftyClick({
      options,
      answer,
      updateDataInFirebase,
    });

    halfedAnswers !== undefined && (await updateDataInFirebase(halfedAnswers));
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
      if (showCheckpoint) {
        router.push("/checkpoint");
      }
    } else {
      router.push("/total");
    }
  }, [
    revealCorrectAnswer,
    isConfirmed,
    selectedAnswer,
    finallyIsCorrectAns,
    showCheckpoint,
    goToTotal,
  ]);

  useFirebaseListener();

  if (openPrize) {
    return <UserPrizeModal openPrize={openPrize} />;
  }

  return showCheckpoint === true ? (
    <Loading />
  ) : (
    <ProtectedWrapper>
      <main
        style={{ backgroundImage: `url(${"/Images/purplebg.png"})` }}
        className="relatve flex min-h-[100vh] min-w-full flex-col justify-center gap-3 bg-cover pt-4 largerdesktop:gap-10"
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
            option1={options?.a}
            option2={options?.b}
            option3={options?.c}
            option4={options?.d}
            answer={answer}
            handleAnswerClick={handleAnswerClick}
            selectedAnswer={selectedAnswer}
            isConfirm={isConfirmed}
            revealedCorrect={revealCorrectAnswer}
            actualCorrectAns={finallyIsCorrectAns}
            showRevealCorrect={showRevealCorrect}
          />
        )}
        {/* {openPrize && <PrizeModal />} */}
      </main>
    </ProtectedWrapper>
  );
}
