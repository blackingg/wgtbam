"use client";
import {
  ChallengeSkeleton,
  Lifelines,
  MillionareLogo,
  UserPrizeModal,
} from "@/components";
import { handleQuestAnswer, handleQuestionUpdate } from "@/helpers";
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

  const allQuestions = useQuestionStore((state) => state.allQuestions);
  const goToTotal = useQuestionStore((state) => state.goToTotal);
  const currentChallengeIndex = useQuestionStore(
    (state) => state.currentChallengeIndex
  );
  const usedFifty = useQuestionStore((state) => state.usedFifty);
  const usedPhone = useQuestionStore((state) => state.usedPhone);
  const usedAudience = useQuestionStore((state) => state.usedAudience);
  const isAnswered = useQuestionStore((state) => state.isAnswered);
  const prizeLevel = useQuestionStore((state) => state.prizeLevel);
  const selectedAnswer = useQuestionStore((state) => state.selectedAnswer);
  const openPrize = useQuestionStore((state) => state.openPrize);
  const isConfirmed = useQuestionStore((state) => state.isConfirmed);
  const finallyIsCorrectAns = useQuestionStore(
    (state) => state.finallyIsCorrectAns
  );
  const revealCorrectAnswer = useQuestionStore(
    (state) => state.revealCorrectAnswer
  );
  const showRevealCorrect = useQuestionStore(
    (state) => state.showRevealCorrect
  );
  const showCheckpoint = useQuestionStore((state) => state.showCheckpoint);
  const continueChallenge = useQuestionStore(
    (state) => state.continueChallenge
  );
  const updateDataInFirebase = useQuestionStore(
    useShallow((state) => state.updateDataInFirebase)
  );

  const halfedAnswers = useFiftyClick({
    allQuestions,
    currentChallengeIndex,
  });
  const handleFiftyFiftyClick = async () => {
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
        openPrize
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

  if (openPrize) {
    return <UserPrizeModal openPrize={openPrize} />;
  }

  return showCheckpoint === true ? (
    <Loading />
  ) : (
    <main
      style={{ backgroundImage: `url(${"/Images/purplebg.png"})` }}
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

      {/* {openPrize && <PrizeModal />} */}
    </main>
  );
}
