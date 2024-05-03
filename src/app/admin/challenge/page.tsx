"use client";
import {
  AskAudienceBtn,
  BackgroundImage,
  ChallengeSkeleton,
  ConfirmationBtn,
  FiftyFiftyButton,
  MillionareLogo,
  PhoneFriendBtn,
  PrizeModal,
} from "@/components";
import { database } from "@/firebase";
import { handleFiftyFifty } from "@/helpers";
import { useCreateQueryString } from "@/hooks";
import { useFiftyClick } from "@/hooks/useFiftyClick";
import { Question } from "@/types";
import { isEqual } from "@/utils";
import { useQuestionStore } from "@/zustand/store";
import { DataSnapshot, off, onValue, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [userRole, setUserRole] = useState<any>("");
  const allQuestions = useQuestionStore((state) => state.allQuestions);
  const currentChallengeIndex = useQuestionStore(
    (state) => state.currentChallengeIndex
  );
  const usedFifty = useQuestionStore((state) => state.usedFifty);
  const usedPhone = useQuestionStore((state) => state.usedPhone);
  const usedAudience = useQuestionStore((state) => state.usedAudience);
  const isAnswered = useQuestionStore((state) => state.isAnswered);
  const isCorrect = useQuestionStore((state) => state.isCorrect);
  const prizeLevel = useQuestionStore((state) => state.prizeLevel);
  const selectedAnswer = useQuestionStore((state) => state.selectedAnswer);
  const openPrize = useQuestionStore((state) => state.openPrize);
  const isConfirmed = useQuestionStore((state) => state.isConfirmed);
  const finallyIsCorrectAns = useQuestionStore(
    (state) => state.finallyIsCorrectAns
  );
  const finallyUserLevel = useQuestionStore((state) => state.finallyUserLevel);
  const setFinallyUserLevel = useQuestionStore(
    (state) => state.setFinallyUserLevel
  );
  const revealCorrectAnswer = useQuestionStore(
    (state) => state.revealCorrectAnswer
  );
  const showRevealCorrect = useQuestionStore(
    (state) => state.showRevealCorrect
  );
  const showCheckpoint = useQuestionStore((state) => state.showCheckpoint);
  const goToNextQuestion = useQuestionStore((state) => state.goToNextQuestion);
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );
  const updateDataInStore = useQuestionStore(
    (state) => state.updateDataInStore
  );
  const router = useRouter();

  const handleFiftyFiftyClick = () => {
    const halfedAnswers = useFiftyClick({
      allQuestions,
      currentChallengeIndex,
    });
    updateDataInFirebase(halfedAnswers);
  };

  const createQueryString = useCreateQueryString();

  let currentuserlevel: number;

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
        currentuserlevel = prizeLevel;
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

  useEffect(() => {
    if (
      revealCorrectAnswer &&
      isConfirmed &&
      selectedAnswer !== null &&
      selectedAnswer === allQuestions[currentChallengeIndex].answer
    ) {
      updateDataInFirebase({
        openPrize: true,
      });
      setTimeout(() => {
        updateDataInFirebase({
          openPrize: false,
        });
        if (currentChallengeIndex >= 14) {
          router.push(
            "/admin/total" +
              "?" +
              createQueryString("prizeLevel", `${prizeLevel}`)
          );
        }
        if (
          (currentChallengeIndex === 4 && showCheckpoint === true) ||
          (currentChallengeIndex === 9 && showCheckpoint === true) ||
          (currentChallengeIndex >= 14 && showCheckpoint === true)
        ) {
          router.push(
            "/admin/checkpoint" +
              "?" +
              createQueryString("prizeLevel", `${prizeLevel}`)
          );

          setTimeout(() => {
            updateDataInFirebase({
              showCheckpoint: false,
            });
          }, 3000);
        }
      }, 3000);
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
  }, [
    revealCorrectAnswer,
    isConfirmed,
    selectedAnswer,
    finallyIsCorrectAns,
    showCheckpoint,
  ]);

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

  const url = process.env.NEXT_PUBLIC_FIREBASE_USERS_URL;

  useEffect(() => {
    fetch(url ?? "")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const values = Object.values(data);
          setUserRole(values);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <main
      style={{ backgroundImage: `url(${"/Images/purplebg.svg"})` }}
      className=" py-4 relatve bg-cover min-w-full min-h-screen flex flex-col justify-center gap-3 largerdesktop:gap-10 "
    >
      <div className=" w-full h-full relative">
        <div className=" max-w-[150px] tablet:max-w-[250px] max-h-[150px] tablet:max-h-[250px] w-full h-full flex justify-center items-center mx-auto">
          <MillionareLogo />
          <div className=" absolute right-[3rem] top-[50%] translate-y-[-50%] flex flex-col ipad:flex-row gap-6 items-center">
            <FiftyFiftyButton
              onClick={() => {
                if (usedFifty === false && isAnswered === false) {
                  handleFiftyFiftyClick();
                }
              }}
              className={`${usedFifty && `bg-[#EB1212]`}`}
            />
            <PhoneFriendBtn
              onClick={() => {
                if (usedPhone === false && isAnswered === false) {
                  updateDataInFirebase({
                    usedPhone: true,
                  });
                }
              }}
              className={`${usedPhone && `bg-[#EB1212]`}`}
            />
            <AskAudienceBtn
              onClick={() => {
                if (usedAudience === false && isAnswered === false) {
                  updateDataInFirebase({
                    usedAudience: true,
                  });
                }
              }}
              className={`${usedAudience && `bg-[#EB1212]`}`}
            />
          </div>
        </div>
      </div>

      <div className=" w-full">
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
          {revealCorrectAnswer === false &&
            userRole !== "" &&
            userRole[0].users.admin.userRole === "admin" && (
              <ConfirmationBtn
                onClick={() => {
                  if (isConfirmed === false) {
                    updateDataInFirebase({
                      isConfirmed: true,
                    });
                    if (revealCorrectAnswer === false) {
                      updateDataInFirebase({
                        revealCorrectAnswer: true,
                        showCheckpoint: true,
                      });
                    }
                  }
                }}
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
            userRole !== "" &&
            userRole[0].users.admin.userRole === "admin" && (
              <ConfirmationBtn
                onClick={() => {
                  if (
                    goToNextQuestion === false &&
                    selectedAnswer !== null &&
                    selectedAnswer ===
                      allQuestions[currentChallengeIndex].answer
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

                  if (
                    selectedAnswer !== null &&
                    selectedAnswer !==
                      allQuestions[currentChallengeIndex].answer
                  ) {
                    router.push(
                      "/admin/total" +
                        "?" +
                        createQueryString("prizeLevel", `${0}`)
                    );
                  }
                }}
                disabled={(() => {
                  if (goToNextQuestion === true) {
                    return true;
                  } else if (isAnswered === false) {
                    return true;
                  }
                  return false;
                })()}
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
