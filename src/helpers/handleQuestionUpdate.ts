import { State, useQuestionStore } from "@/zustand/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleQuestionUpdate = async ({
  revealCorrectAnswer,
  isConfirmed,
  selectedAnswer,
  finallyIsCorrectAns,
  showCheckpoint,
  realQuestAns,
  currentChallengeIndex,
  prizeLevel,
  showRevealCorrect,
  router,
  updateDataInFirebase,
  user,
  continueChallenge,
  openPrize,
}: {
  revealCorrectAnswer: boolean;
  isConfirmed: boolean;
  selectedAnswer: string;
  finallyIsCorrectAns: boolean;
  showCheckpoint: boolean;
  realQuestAns: string;
  currentChallengeIndex: number;
  prizeLevel: number;
  showRevealCorrect: string;
  router: AppRouterInstance;
  updateDataInFirebase: (data: Partial<State>) => Promise<void>;
  user: string;
  continueChallenge: boolean;
  openPrize: boolean;
}) => {
  try {
    if (
      revealCorrectAnswer &&
      isConfirmed &&
      selectedAnswer !== "" &&
      selectedAnswer === realQuestAns
    ) {
      await updateDataInFirebase({
        openPrize: true,
      });

      if (currentChallengeIndex >= 14) {
        await updateDataInFirebase({
          prizeLevel: prizeLevel,
        });

        router.push(user === "admin" ? "/admin/total" : "/total");
      }
      if (
        (currentChallengeIndex === 4 &&
          showCheckpoint === false &&
          continueChallenge === false) ||
        (currentChallengeIndex === 9 &&
          showCheckpoint === false &&
          continueChallenge === false) ||
        (currentChallengeIndex >= 14 &&
          showCheckpoint === false &&
          continueChallenge === false)
      ) {
        await updateDataInFirebase({
          showCheckpoint: true,
          prizeLevel: prizeLevel,
        });

        router.push(user === "admin" ? "/admin/checkpoint" : "/checkpoint");
      }
    }

    if (
      finallyIsCorrectAns === true &&
      showRevealCorrect === realQuestAns &&
      isConfirmed === true
    ) {
      await updateDataInFirebase({
        revealCorrectAnswer: true,
        isConfirmed: true,
      });
    }
  } catch (error) {
    console.log("We encountered an error", error);
  }
};
