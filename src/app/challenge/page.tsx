"use client";
import { ChallengeSkeleton, ConfirmationBtn, PrizeModal } from "@/components";
import { database } from "@/firebase";
import { handleFiftyFifty } from "@/helpers";
import { isEqual } from "@/utils";
import { useQuestionStore } from "@/zustand/store";
import { DataSnapshot, off, onValue, ref, set } from "firebase/database";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [userRole, setUserRole] = useState<any>("");
  const setQuestArr = useQuestionStore((state) => state.setQuestionArr);
  const allQuestions = useQuestionStore((state) => state.allQuestions);
  const setAllQuestions = useQuestionStore((state) => state.setAllQuestions);
  const currentChallengeIndex = useQuestionStore(
    (state) => state.currentChallengeIndex
  );
  const setCurrentChallengeIndex = useQuestionStore(
    (state) => state.setCurrentChallengeIndex
  );
  const usedFifty = useQuestionStore((state) => state.usedFifty);
  const setUsedFifty = useQuestionStore((state) => state.setUsedFifty);
  const usedPhone = useQuestionStore((state) => state.usedPhone);
  const setUsedPhone = useQuestionStore((state) => state.setUsedPhone);
  const usedAudience = useQuestionStore((state) => state.usedAudience);
  const setUsedAudience = useQuestionStore((state) => state.setUsedAudience);
  const isAnswered = useQuestionStore((state) => state.isAnswered);
  const setIsAnswered = useQuestionStore((state) => state.setIsAnswered);
  const isCorrect = useQuestionStore((state) => state.isCorrect);
  const setIsCorrect = useQuestionStore((state) => state.setIsCorrect);
  const prizeLevel = useQuestionStore((state) => state.prizeLevel);
  const setPrizeLevel = useQuestionStore((state) => state.setPrizeLevel);
  const selectedAnswer = useQuestionStore((state) => state.selectedAnswer);
  const setSelectedAnswer = useQuestionStore(
    (state) => state.setSelectedAnswer
  );
  const openPrize = useQuestionStore((state) => state.openPrize);
  const setOpenPrize = useQuestionStore((state) => state.setOpenPrize);
  const isConfirmed = useQuestionStore((state) => state.isConfirmed);
  const setIsConfirmed = useQuestionStore((state) => state.setIsConfirmed);
  const finallyIsCorrectAns = useQuestionStore(
    (state) => state.finallyIsCorrectAns
  );
  const setFinallyIsCorrectAns = useQuestionStore(
    (state) => state.setFinallyIsCorrectAns
  );
  const finallyUserLevel = useQuestionStore((state) => state.finallyUserLevel);
  const setFinallyUserLevel = useQuestionStore(
    (state) => state.setFinallyUserLevel
  );
  const revealCorrectAnswer = useQuestionStore(
    (state) => state.revealCorrectAnswer
  );
  const setRevealCorrectAnswer = useQuestionStore(
    (state) => state.setRevealCorrectAnswer
  );
  const showRevealCorrect = useQuestionStore(
    (state) => state.showRevealCorrect
  );
  const setShowRevealCorrect = useQuestionStore(
    (state) => state.setShowRevealCorrect
  );
  const goToNextQuestion = useQuestionStore((state) => state.goToNextQuestion);
  const setGoToNextQuestion = useQuestionStore(
    (state) => state.setGoToNextQuestion
  );
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );

  const updateDataInStore = useQuestionStore(
    (state) => state.updateDataInStore
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFiftyFiftyClick = () => {
    const { updatedOptions, challengeIndex } = handleFiftyFifty(
      allQuestions,
      currentChallengeIndex
    );

    const newData = {
      allQuestions: allQuestions.map((question, index) => {
        if (index === challengeIndex) {
          return {
            ...question,
            option1: updatedOptions[0] || "",
            option2: updatedOptions[1] || "",
            option3: updatedOptions[2] || "",
            option4: updatedOptions[3] || "",
          };
        }
        return question;
      }),
      usedFifty: true,
    };

    updateDataInFirebase(newData);
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
      updateDataInFirebase({
        isAnswered: true,
      });
      if (selectedOption === allQuestions[currentChallengeIndex].answer) {
        let updatedPrizeLvl = prizeLevel + 1;
        updateDataInFirebase({
          isCorrect: true,
          showRevealCorrect: selectedOption,
          prizeLevel: updatedPrizeLvl,
          selectedAnswer: selectedOption,
          finallyIsCorrectAns: true,
        });
      } else {
        let currentuserlevel = prizeLevel;
        if (currentuserlevel >= 15) {
          currentuserlevel = 15;
        } else if (currentuserlevel >= 10) {
          currentuserlevel = 10;
        } else if (currentuserlevel >= 5) {
          currentuserlevel = 5;
        }
        updateDataInFirebase({
          selectedAnswer: selectedOption,
          finallyUserLevel: currentuserlevel,
          finallyIsCorrectAns: false,
          showRevealCorrect: allQuestions[currentChallengeIndex].answer,
        });
      }
    }
  };

  // const nextQuestion = () => {
  //   let newChallengeIndex = currentChallengeIndex + 1;
  //   console.log("nCI", newChallengeIndex);

  //   updateDataInFirebase({
  //     currentChallengeIndex: newChallengeIndex,
  //     selectedAnswer: null,
  //     revealCorrectAnswer: false,
  //     isConfirmed: false,
  //     isAnswered: false,
  //     goToNextQuestion: false,
  //   });
  // };

  useEffect(() => {
    if (
      revealCorrectAnswer &&
      isConfirmed &&
      selectedAnswer !== null &&
      selectedAnswer === allQuestions[currentChallengeIndex].answer
    ) {
      setTimeout(() => {
        updateDataInFirebase({
          openPrize: true,
        });
        setTimeout(() => {
          updateDataInFirebase({
            openPrize: false,
          });
          if (currentChallengeIndex >= 14) {
            router.push(
              "/total" + "?" + createQueryString("prizeLevel", `${prizeLevel}`)
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
      updateDataInFirebase({
        revealCorrectAnswer: true,
        isConfirmed: true,
      });
    }
  }, [revealCorrectAnswer, isConfirmed, selectedAnswer, finallyIsCorrectAns]);

  // *************************************
  useEffect(() => {
    const dbRef = ref(database, "questionStore");

    const listener = (snapshot: DataSnapshot) => {
      const newData = snapshot.val();
      if (newData && !isEqual(newData, useQuestionStore.getState())) {
        updateDataInStore(newData);
      }
    };

    onValue(dbRef, listener);

    return () => {
      off(dbRef, "value", listener);
    };
  }, []);
  // *************************************

  const url = `https://owgtbam-default-rtdb.firebaseio.com/users.json`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const values = Object.values(data);
          setUserRole(values);
        }
      })
      .catch((error) => console.error("Error:", error));
    // const UserData = {
    //   users: {
    //     player: { userRole: "player" },
    //     admin: { userRole: "admin" },
    //   },
    // };
  }, []);

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
                  updateDataInFirebase({
                    usedPhone: true,
                  });
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
                  updateDataInFirebase({
                    usedAudience: true,
                  });
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
        handleAnswerClick={handleAnswerClick}
        selectedAnswer={selectedAnswer}
        isConfirm={isConfirmed}
        revealedCorrect={revealCorrectAnswer}
        actualCorrectAns={finallyIsCorrectAns}
        showRevealCorrect={showRevealCorrect}
      />

      <div
        className={` pb-4 -mt-20 flex flex-col tablet:flex-row gap-4 tablet:gap-0 justify-center items-center px-12`}
      >
        {revealCorrectAnswer === false &&
          userRole !== "" &&
          userRole[0].users.admin.userRole === "player" && (
            <ConfirmationBtn
              onClick={() => {
                if (isConfirmed === false) {
                  updateDataInFirebase({
                    isConfirmed: true,
                  });
                  if (revealCorrectAnswer === false) {
                    updateDataInFirebase({
                      revealCorrectAnswer: true,
                    });
                  }
                }
              }}
              disabled={isAnswered === false}
              btntext={
                revealCorrectAnswer ? "Confirm Answer" : "Reveal Correct Answer"
              }
              className={revealCorrectAnswer ? "bg-[#E07000]" : ""}
            />
          )}

        {revealCorrectAnswer &&
          isConfirmed &&
          userRole !== "" &&
          userRole[0].users.admin.userRole === "player" && (
            <ConfirmationBtn
              onClick={() => {
                if (
                  goToNextQuestion === false &&
                  selectedAnswer !== null &&
                  selectedAnswer === allQuestions[currentChallengeIndex].answer
                ) {
                  updateDataInFirebase({
                    goToNextQuestion: true,
                  });
                  const newIndex = currentChallengeIndex + 1;

                  updateDataInFirebase({
                    currentChallengeIndex: newIndex,
                    selectedAnswer: null,
                    revealCorrectAnswer: false,
                    isConfirmed: false,
                    isAnswered: false,
                    goToNextQuestion: false,
                  });
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

      {openPrize && <PrizeModal />}
    </section>
  );
}
