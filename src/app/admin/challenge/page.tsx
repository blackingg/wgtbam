"use client";
import {
  ChallengeSkeleton,
  ConfirmationBtn,
  Lifelines,
  MillionareLogo,
  PrizeModal,
} from "@/components";
import {
  GoToNextQuestH,
  handleQuestAnswer,
  handleQuestionUpdate,
} from "@/helpers";
import { useFirebaseListener } from "@/hooks";
import { useFiftyClick } from "@/hooks/useFiftyClick";
import { useQuestionStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const userRole = "admin";
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
    goToNextQuestion,
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

  const GoToNextQuestion = GoToNextQuestH({
    goToNextQuestion: goToNextQuestion,
    selectedAnswer: selectedAnswer,
    realRightAnswer: allQuestions[currentChallengeIndex].answer,
    currentChallengeIndex: currentChallengeIndex,
    router: router,
    updateDataInFirebase: updateDataInFirebase,
  });

  async function ConfirmAnswer() {
    if (isConfirmed === false) {
      await updateDataInFirebase({
        isConfirmed: true,
      });
      if (revealCorrectAnswer === false) {
        await updateDataInFirebase({
          revealCorrectAnswer: true,
        });
      }
    }
  }

  useEffect(() => {
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
  }, [
    revealCorrectAnswer,
    isConfirmed,
    selectedAnswer,
    finallyIsCorrectAns,
    showCheckpoint,
  ]);

  useFirebaseListener();

  return (
    <main
      style={{ backgroundImage: `url(${"/Images/purplebg.svg"})` }}
      className=" py-4 relatve bg-cover min-w-full min-h-screen flex flex-col justify-center gap-3 largerdesktop:gap-10"
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

      <div className=" w-full space-y-10">
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

        <div
          className={` pb-4 l-mt-20 flex flex-col tablet:flex-row gap-4 tablet:gap-0 justify-center items-center px-12`}
        >
          {revealCorrectAnswer === false && userRole === "admin" && (
            <ConfirmationBtn
              onClick={ConfirmAnswer}
              disabled={isAnswered === false}
              btntext={
                revealCorrectAnswer ? "Confirm Answer" : "Reveal Correct Answer"
              }
              className={revealCorrectAnswer ? "bg-[#E07000]" : ""}
            />
          )}

          {revealCorrectAnswer &&
            isConfirmed &&
            selectedAnswer !== "" &&
            userRole === "admin" && (
              <ConfirmationBtn
                onClick={GoToNextQuestion}
                disabled={
                  goToNextQuestion === true || isAnswered === false
                    ? true
                    : false
                }
                btntext="Go to Next Question"
                className=" bg-[#FFFFFF] text-[#8A0089]"
              />
            )}
        </div>
      </div>

      {openPrize && <PrizeModal />}
    </main>
  );
}
