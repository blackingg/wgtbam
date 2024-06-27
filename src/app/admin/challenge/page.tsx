"use client";
import {
  ChallengeSkeleton,
  ConfirmationBtn,
  Lifelines,
  MillionareLogo,
  PrizeModal,
  ProtectedWrapper,
} from "@/components";
import {
  GoToNextQuestH,
  HandleQuestAnswer,
  HandleQuestionUpdate,
} from "@/helpers";
import { useFirebaseListener } from "@/hooks";
import { useFiftyClick } from "@/hooks/useFiftyClick";
import { useQuestionStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export default function Home() {
  const userRole = "admin";
  const router = useRouter();
  let currentuserlevel: number = 0;
  const answer = useQuestionStore((state) => state.answer);
  const goToTotal = useQuestionStore((state) => state.goToTotal);
  const difficulty_level = useQuestionStore((state) => state.difficulty_level);
  const usedFifty = useQuestionStore((state) => state.usedFifty);
  const usedPhone = useQuestionStore((state) => state.usedPhone);
  const usedAudience = useQuestionStore((state) => state.usedAudience);
  const isAnswered = useQuestionStore((state) => state.isAnswered);
  const prizeLevel = useQuestionStore((state) => state.prizeLevel);
  const id = useQuestionStore((state) => state.id);
  const openPrize = useQuestionStore((state) => state.openPrize);
  const options = useQuestionStore((state) => state.options);
  const question = useQuestionStore((state) => state.question);
  const revealCorrectAnswer = useQuestionStore(
    (state) => state.revealCorrectAnswer,
  );
  const isConfirmed = useQuestionStore((state) => state.isConfirmed);
  const selectedAnswer = useQuestionStore((state) => state.selectedAnswer);
  const finallyIsCorrectAns = useQuestionStore(
    (state) => state.finallyIsCorrectAns,
  );

  const showCheckpoint = useQuestionStore((state) => state.showCheckpoint);
  const continueChallenge = useQuestionStore(
    (state) => state.continueChallenge,
  );
  const showRevealCorrect = useQuestionStore(
    (state) => state.showRevealCorrect,
  );
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase,
  );
  const getQuestionsFromServer = useQuestionStore(
    (state) => state.getQuestionsFromServer,
  );

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

  const GoToNextQuestion = GoToNextQuestH({
    router: router,
    selectedAnswer,
    realRightAnswer: answer as string,
    updateDataInFirebase,
    getQuestionsFromServer,
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
        router.push("/admin/checkpoint");
      }
    } else {
      router.push("/admin/total");
    }
  }, [
    revealCorrectAnswer,
    isConfirmed,
    selectedAnswer,
    finallyIsCorrectAns,
    showCheckpoint,
    goToTotal,
  ]);

  useEffect(() => {
    if (!continueChallenge) {
      getQuestionsFromServer();
    }
  }, []);

  useFirebaseListener();

  if (openPrize) {
    return <PrizeModal openPrize={openPrize} />;
  }

  return showCheckpoint === true ? (
    <Loading />
  ) : (
    <ProtectedWrapper>
      <main
        style={{ backgroundImage: `url(${"/Images/purplebg.png"})` }}
        className="relative flex min-h-[100vh] min-w-full flex-col justify-center gap-3 bg-cover py-4 largerdesktop:gap-10"
      >
        <div className="text-5xl font-medium text-white">ans: {answer}</div>
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
        <div className="w-full space-y-10">
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
          <div
            className={`l-mt-20 flex flex-col items-center justify-center gap-4 px-12 pb-4 tablet:flex-row tablet:gap-0`}
          >
            {/* {revealCorrectAnswer === false && userRole === "admin" && ( */}
            {revealCorrectAnswer === false && userRole === "admin" && (
              <ConfirmationBtn
                onClick={ConfirmAnswer}
                disabled={isAnswered === false}
                btntext={
                  revealCorrectAnswer
                    ? "Confirm Answer"
                    : "Reveal Correct Answer"
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
                    // goToNextQuestion === true || isAnswered === false
                    isAnswered === false ? true : false
                  }
                  btntext="Go to Next Question"
                  className="bg-[#FFFFFF] text-[#8A0089]"
                />
              )}
          </div>
        </div>
      </main>
    </ProtectedWrapper>
  );
}
