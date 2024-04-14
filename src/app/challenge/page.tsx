"use client";
import { ChallengeSkeleton, PrizeModal } from "@/components";
import { handleFiftyFifty } from "@/helpers";
import { QuestionArr } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

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
        // setPrizeLevel((prev) => prev + 1);
        setPrizeLevel((prev) => {
          prizeLevelRef.current = prev + 1; // Update the ref when prizeLevel changes
          return prev + 1;
        });
        setIsAnswered(true);
        setSelectedAnswer(selectedOption);

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
            } else {
              nextQuestion();
            }
          }, 3000);
        }, 300);
      } else {
        let currentuserlevel = prizeLevelRef.current;
        if (currentuserlevel >= 15) {
          currentuserlevel = 15;
        } else if (currentuserlevel >= 10) {
          currentuserlevel = 10;
        } else if (currentuserlevel >= 5) {
          currentuserlevel = 5;
        }
        console.log("Current Prize Level", currentuserlevel);
        setIsAnswered(true);
        setSelectedAnswer(selectedOption);
        router.push(
          "/total" +
            "?" +
            createQueryString("prizeLevel", `${currentuserlevel}`)
        );
      }
    }
  };

  const nextQuestion = () => {
    setCurrentChallengeIndex(currentChallengeIndex + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  // console.log("******************Prize Level", prizeLevel);

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
      />

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
