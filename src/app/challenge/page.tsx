"use client";
import {
  ChallengeSkeleton,
  Lifelines,
  MillionareLogo,
  PrizeModal,
} from "@/components";
import { handleQuestAnswer, handleQuestionUpdate } from "@/helpers";
import { useCreateQueryString, useFirebaseListener } from "@/hooks";
import { useFiftyClick } from "@/hooks/useFiftyClick";
import { useQuestionStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export default function Home() {
  const userRole = "player";
  const router = useRouter();
  let currentuserlevel: number = 0;

  const {
    allQuestions,
    currentChallengeIndex,
    usedFifty,
    usedPhone,
    usedAudience,
    isAnswered,
    prizeLevel,
    selectedAnswer,
    openPrize,
    isConfirmed,
    finallyIsCorrectAns,
    revealCorrectAnswer,
    showRevealCorrect,
    showCheckpoint,
    goToTotal,
    continueChallenge,
    updateDataInFirebase,
  } = useQuestionStore();

  const handleFiftyFiftyClick = async () => {
    const halfedAnswers = useFiftyClick({
      allQuestions,
      currentChallengeIndex,
    });
    await updateDataInFirebase(halfedAnswers);
  };

  const handleAnswerClick = handleQuestAnswer({
    selectedAnswer: selectedAnswer,
    realQuestAns: allQuestions[currentChallengeIndex].answer,
    prizeLevel: prizeLevel,
    currentuserlevel: currentuserlevel,
    updateDataInFirebase: updateDataInFirebase,
  });

  useEffect(() => {
    if (goToTotal === false) {
      handleQuestionUpdate({
        revealCorrectAnswer: revealCorrectAnswer,
        isConfirmed: isConfirmed,
        selectedAnswer: selectedAnswer,
        finallyIsCorrectAns: finallyIsCorrectAns,
        showCheckpoint: showCheckpoint,
        realQuestAns: allQuestions[currentChallengeIndex].answer,
        currentChallengeIndex: currentChallengeIndex,
        prizeLevel: prizeLevel,
        showRevealCorrect: showRevealCorrect,
        router: router,
        updateDataInFirebase: updateDataInFirebase,
        user: userRole,
        continueChallenge: continueChallenge,
      });
      showCheckpoint === true && router.push("/checkpoint");
    }

    goToTotal === true && router.push("/total");
  }, [
    revealCorrectAnswer,
    isConfirmed,
    selectedAnswer,
    finallyIsCorrectAns,
    showCheckpoint,
    goToTotal,
  ]);

  useFirebaseListener();

  return showCheckpoint === true ? (
    <Loading />
  ) : (
    <main
      style={{ backgroundImage: `url(${"/Images/purplebg.svg"})` }}
      className=" pt-4 relatve bg-cover min-w-full min-h-screen flex flex-col justify-center gap-3 largerdesktop:gap-10"
    >
      <div className=" w-full h-full relative">
        <div className=" max-w-[150px] tablet:max-w-[250px] max-h-[150px] tablet:max-h-[250px] w-full h-full flex justify-center items-center mx-auto">
          <MillionareLogo />
          <Lifelines
            usedFifty={usedFifty}
            usedPhone={usedPhone}
            usedAudience={usedAudience}
            isAnswered={isAnswered}
            handleFiftyFiftyClick={handleFiftyFiftyClick}
          />
        </div>
      </div>

      <ChallengeSkeleton
        question={allQuestions[currentChallengeIndex].question}
        option1={allQuestions[currentChallengeIndex].option1}
        option2={allQuestions[currentChallengeIndex].option2}
        option3={allQuestions[currentChallengeIndex].option3}
        option4={allQuestions[currentChallengeIndex].option4}
        answer={allQuestions[currentChallengeIndex].answer}
        handleAnswerClick={handleAnswerClick}
        selectedAnswer={selectedAnswer}
        isConfirm={isConfirmed}
        revealedCorrect={revealCorrectAnswer}
        actualCorrectAns={finallyIsCorrectAns}
        showRevealCorrect={showRevealCorrect}
      />

      {openPrize && <PrizeModal />}
    </main>
  );
}
