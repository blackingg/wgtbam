import { State, useQuestionStore } from "@/zustand/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

export const GoToNextQuestH = ({
  selectedAnswer,
  realRightAnswer,
  updateDataInFirebase,
  router,
  getQuestionsFromServer
}: {
  selectedAnswer: string;
  realRightAnswer: string;
  updateDataInFirebase: (data: Partial<State>) => Promise<void>;
  router: AppRouterInstance;
  getQuestionsFromServer: () => Promise<void>
}) => {
 
  
  const RunNext = async () => {
    try {
      if ( selectedAnswer === realRightAnswer) {
        // const newIndex = currentChallengeIndex + 1;

        await updateDataInFirebase({
          // currentChallengeIndex: newIndex,
          selectedAnswer: "",
          revealCorrectAnswer: false,
          isConfirmed: false,
          isAnswered: false,
          // goToNextQuestion: true,
          showRevealCorrect: "",
          continueChallenge: false,
        });

        getQuestionsFromServer();

        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // await updateDataInFirebase({
        //   goToNextQuestion: false,
        // });


      } else if (selectedAnswer !== realRightAnswer) {
        await updateDataInFirebase({
          goToTotal: true,
          prizeLevel: 0,
          continueChallenge: false,
        });

        router.push("/admin/total");
      }
    } catch (error) {
      // console.log("We encountered an error ", error);
      toast.error("Network error");
    }
  };

  return RunNext;
};