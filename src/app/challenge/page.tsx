"use client";
import {
  AnswerButton,
  ChallengeSkeleton,
  ConfirmationBtn,
  PrizeModal,
} from "@/components";
import { handleFiftyFifty } from "@/helpers";
import { QuestionArr } from "@/utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export default function Home() {
  const [allQuestions, setAllQuestions] = useState(QuestionArr);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [usedFifty, setUsedFifty] = useState(false);
  const [usedPhone, setUsedPhone] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);

  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [prizeLevel, setPrizeLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [openPrize, setOpenPrize] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [finallyIsCorrectAns, setFinallyIsCorrectAns] = useState(false);
  const [finallyUserLevel, setFinallyUserLevel] = useState(prizeLevel);
  const [revealCorrectAnswer, setRevealCorrectAnswer] = useState(false);

  const [showRevealCorrect, setShowRevealCorrect] = useState("");
  const [goToNextQuestion, setGoToNextQuestion] = useState(false);

  const prizeLevelRef = useRef(prizeLevel);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFiftyFiftyClick = () => {
    handleFiftyFifty(
      allQuestions[currentChallengeIndex],
      currentChallengeIndex, // Assuming currentQuestionIndex is always 0 for this component
      setAllQuestions, // Provide appropriate setQuestions function if needed
      setUsedFifty // Provide appropriate setUsedFiftyFifty function if needed
    );
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleAnswerClick = (selectedOption: string) => {
    if (selectedAnswer === null) {
      if (selectedOption === allQuestions[currentChallengeIndex].answer) {
        setIsCorrect(true);
        setShowRevealCorrect(selectedOption);
        // setPrizeLevel((prev) => prev + 1);
        setPrizeLevel((prev) => {
          prizeLevelRef.current = prev + 1; // Update the ref when prizeLevel changes
          return prev + 1;
        });
        setIsAnswered(true);
        setSelectedAnswer(selectedOption);

        setFinallyIsCorrectAns(true);
      } else {
        let currentuserlevel = prizeLevelRef.current;
        if (currentuserlevel >= 15) {
          currentuserlevel = 15;
        } else if (currentuserlevel >= 10) {
          currentuserlevel = 10;
        } else if (currentuserlevel >= 5) {
          currentuserlevel = 5;
        }
        // console.log("Current Prize Level", currentuserlevel);
        setIsAnswered(true);
        setSelectedAnswer(selectedOption);
        setFinallyUserLevel(currentuserlevel);
        setFinallyIsCorrectAns(false);
        setShowRevealCorrect(allQuestions[currentChallengeIndex].answer);
      }
    }
  };

  const nextQuestion = () => {
    setCurrentChallengeIndex(currentChallengeIndex + 1);
    setSelectedAnswer(null);
    setRevealCorrectAnswer(false);
    setIsConfirmed(false);
    setIsAnswered(false);
    setGoToNextQuestion(false);
  };

  useEffect(() => {
    if (
      revealCorrectAnswer &&
      isConfirmed &&
      selectedAnswer !== null &&
      selectedAnswer === allQuestions[currentChallengeIndex].answer
    ) {
      setTimeout(() => {
        setOpenPrize(true);
        setTimeout(() => {
          setOpenPrize(false);
          if (currentChallengeIndex >= 14) {
            router.push(
              "/total" +
                "?" +
                createQueryString("prizeLevel", `${prizeLevelRef.current}`)
            );
          }
        }, 3000);
      }, 300);
    }

    if (
      revealCorrectAnswer === true &&
      isConfirmed === true &&
      selectedAnswer !== null &&
      selectedAnswer !== allQuestions[currentChallengeIndex].answer
    ) {
      setTimeout(() => {
        router.push(
          "/total" +
            "?" +
            createQueryString("prizeLevel", `${finallyUserLevel}`)
        );
      }, 500);
    }

    if (
      finallyIsCorrectAns === true &&
      showRevealCorrect === allQuestions[currentChallengeIndex].answer &&
      isConfirmed === true
    ) {
      setRevealCorrectAnswer(true);
      setIsConfirmed(true);
    }
  }, [isConfirmed, finallyIsCorrectAns, revealCorrectAnswer, goToNextQuestion]);

  // console.log("Correct answer", allQuestions[currentChallengeIndex].answer);
  // console.log("Correct answer SRC", showRevealCorrect);

  return (
    <section className=" pt-4 relative w-full min-h-screen flex flex-col justify-center gap-20 purplebg">
      <div className=" w-full h-full relative">
        <div className=" max-w-[150px] tablet:max-w-[250px] max-h-[150px] tablet:max-h-[250px] w-full h-full flex justify-center items-center mx-auto">
          <img src="/Images/logo2.svg" alt="Logo" className="" />
          <div className=" absolute right-[3rem] top-[50%] translate-y-[-50%] flex flex-col ipad:flex-row gap-6 items-center">
            <button
              onClick={() => {
                if (usedFifty === false && isAnswered === false) {
                  handleFiftyFiftyClick();
                }
              }}
              className={`${
                usedFifty ? "bg-[#EB1212]" : "bg-white/90"
              } max-w-[50px] tablet:max-w-[100px]  max-h-[25px] tablet:max-h-[50px] w-full h-full flex justify-center items-center font-montserrat font-bold text-xs tablet:text-xl text-[#8A0089] rounded-[72px] shadow-md px-6 py-4`}
            >
              50/50
            </button>
            <button
              onClick={() => {
                if (usedPhone === false && isAnswered === false) {
                  setUsedPhone(true);
                }
              }}
              className={`${
                usedPhone ? "bg-[#EB1212]" : "bg-white/90"
              }  max-w-[50px] tablet:max-w-[100px]  max-h-[25px] tablet:max-h-[50px] w-full h-full flex justify-center items-center font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] shadow-md px-6 py-4`}
            >
              <img
                src="/Images/phoneIcon.png"
                alt=""
                className=" max-w-[20px] tablet:max-w-[30px] max-h-[20px] tablet:max-h-[30px]"
              />
            </button>
            <button
              onClick={() => {
                if (usedAudience === false && isAnswered === false) {
                  setUsedAudience(true);
                }
              }}
              className={`${
                usedAudience ? "bg-[#EB1212]" : "bg-white/90"
              } max-w-[50px] tablet:max-w-[100px]  max-h-[25px] tablet:max-h-[50px] w-full h-full flex justify-center items-center font-montserrat font-bold text-3xl text-[#8A0089] rounded-[72px] shadow-md px-6 py-4`}
            >
              <img
                src="/Images/userGroupIcon.png"
                alt=""
                className=" max-w-[20px] tablet:max-w-[30px] max-h-[20px] tablet:max-h-[30px]"
              />
            </button>
          </div>
        </div>
      </div>

      <ChallengeSkeleton
        question={allQuestions[currentChallengeIndex].question}
        option1={allQuestions[currentChallengeIndex].option1}
        option2={allQuestions[currentChallengeIndex].option2}
        option3={allQuestions[currentChallengeIndex].option3}
        option4={allQuestions[currentChallengeIndex].option4}
        answer={allQuestions[currentChallengeIndex].answer}
        // setIsAnswered={setIsAnswered}
        handleAnswerClick={handleAnswerClick}
        selectedAnswer={selectedAnswer}
        isConfirm={isConfirmed}
        revealedCorrect={revealCorrectAnswer}
        actualCorrectAns={finallyIsCorrectAns}
        showRevealCorrect={showRevealCorrect}
      />

      <div
        className={` pb-4 -mt-20 flex flex-col tablet:flex-row gap-4 tablet:gap-0 ${
          revealCorrectAnswer === true ? "justify-center" : "justify-between"
        } items-center px-12`}
      >
        {revealCorrectAnswer === false && (
          <>
            <ConfirmationBtn
              btntext="Reveal Correct Answer"
              onClick={() => {
                // console.log("Reveal Correct Answer");

                if (revealCorrectAnswer === false) {
                  // console.log("Reveal Correct Inside");
                  setRevealCorrectAnswer(true);
                }
              }}
              disabled={(() => {
                if (isAnswered === false) {
                  return true;
                }
                return false;
              })()}
            />

            <ConfirmationBtn
              onClick={() => {
                // console.log("Confirm Participant Answer");

                if (isConfirmed === false) {
                  // console.log("Confirm Inside");
                  setIsConfirmed(true);
                }
              }}
              disabled={(() => {
                if (isAnswered === false) {
                  return true;
                }
                return false;
              })()}
              btntext="Confirm Participant Answer"
              className=" bg-[#E07000]"
            />
          </>
        )}

        {revealCorrectAnswer && isConfirmed && (
          <ConfirmationBtn
            onClick={() => {
              // console.log("Go to Next Question");

              if (
                goToNextQuestion === false &&
                selectedAnswer !== null &&
                selectedAnswer === allQuestions[currentChallengeIndex].answer
              ) {
                // console.log("Next Inside");
                setGoToNextQuestion(true);
                nextQuestion();
              } else {
              }
            }}
            disabled={(() => {
              if (goToNextQuestion === true) {
                return true;
              } else if (isAnswered === false) {
                return true;
              } else if (
                selectedAnswer !== null &&
                selectedAnswer !== allQuestions[currentChallengeIndex].answer
              ) {
                return true;
              }
              return false;
            })()}
            btntext="Go to Next Question"
            className=" bg-[#FFFFFF] text-[#8A0089]"
          />
        )}
      </div>

      {openPrize && (
        <PrizeModal
          isOpen={openPrize}
          setIsOpen={setOpenPrize}
          prizeLevel={prizeLevel}
          usedFifty={usedFifty}
          usedPhone={usedPhone}
          usedAudience={usedAudience}
        />
      )}
    </section>
  );
}
