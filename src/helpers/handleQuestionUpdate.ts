import { State, useQuestionStore } from "@/zustand/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

export const HandleQuestionUpdate = async ({revealCorrectAnswer,
  isConfirmed,
  selectedAnswer,
  finallyIsCorrectAns,
  showCheckpoint,
  realQuestAns,
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
  prizeLevel: number;
  showRevealCorrect: string;
  router: AppRouterInstance;
  updateDataInFirebase: (data: Partial<State>) => Promise<void>;
  user: string;
  continueChallenge: boolean;
  openPrize: boolean}) => {
  

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

      if (prizeLevel >= 15) {
        // await updateDataInFirebase({
        //   prizeLevel: prizeLevel,
        // });

        router.push(user === "admin" ? "/admin/total" : "/total");
      }
      if (
        (prizeLevel === 5 &&
          showCheckpoint === false &&
          continueChallenge === false) ||
        (prizeLevel === 10 &&
          showCheckpoint === false &&
          continueChallenge === false) // ||
        // (prizeLevel >= 15 &&
        //   showCheckpoint === false &&
        //   continueChallenge === false)
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
    // console.log("We encountered an error", error);
    toast.error("Network error");
  }
};