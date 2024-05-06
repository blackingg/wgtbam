import { State } from "@/zustand/store";
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
}) => {
  if (
    revealCorrectAnswer &&
    isConfirmed &&
    selectedAnswer !== "" &&
    selectedAnswer === realQuestAns
  ) {
    await updateDataInFirebase({
      openPrize: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // setTimeout(() => {
    await updateDataInFirebase({
      openPrize: false,
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
      // setTimeout(() => {
      //   updateDataInFirebase({
      //     showCheckpoint: false,
      //   });
      // }, 3000);
    }
    // }, 3000);
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
};
