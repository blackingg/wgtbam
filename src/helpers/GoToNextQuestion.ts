
import { State } from "@/zustand/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const GoToNextQuestH = ({
  goToNextQuestion,
  selectedAnswer,
  realRightAnswer,
  currentChallengeIndex,
  router,
  updateDataInFirebase,
}: {
  goToNextQuestion: boolean;
  selectedAnswer: string;
  realRightAnswer: string;
  currentChallengeIndex: number;
  router: AppRouterInstance;
  updateDataInFirebase: (data: Partial<State>) => Promise<void>;
}) => {

  const RunNext = async () => {
    if (goToNextQuestion === false && selectedAnswer === realRightAnswer) {
      const newIndex = currentChallengeIndex + 1;

     await updateDataInFirebase({
        currentChallengeIndex: newIndex,
        selectedAnswer: "",
        revealCorrectAnswer: false,
        isConfirmed: false,
        isAnswered: false,
        goToNextQuestion: true,
        showRevealCorrect: "",
        continueChallenge: false
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

     await updateDataInFirebase({
          goToNextQuestion: false,
        });
    }

    if (selectedAnswer !== realRightAnswer) {
      await updateDataInFirebase({
        goToTotal: true,
        prizeLevel: 0,
        continueChallenge : false
      })
      
      router.push(
        "/admin/total"
      );
    }
  };

  return RunNext;
};
