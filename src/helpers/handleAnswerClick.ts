import { State, useQuestionStore } from "@/zustand/store";

export const HandleQuestAnswer = ({
  selectedOption,
  realQuestAns,
  prizeLevel,
  updateDataInFirebase,
}: {
  selectedOption: string;
  realQuestAns: string;
  prizeLevel: number;
  updateDataInFirebase: (data: Partial<State>) => Promise<void>;
}) => {
 

  const handleAnswerClick = async (selectedOption: string) => {

    if (!realQuestAns) return;

    await updateDataInFirebase({
      isAnswered: true,
    });

    if (selectedOption === realQuestAns) {
      const updatedPrizeLevel = prizeLevel + 1;

      await updateDataInFirebase({
        isCorrect: true,
        showRevealCorrect: selectedOption,
        prizeLevel: updatedPrizeLevel,
        selectedAnswer: selectedOption,
        finallyIsCorrectAns: true,
      });
    } else {
      let finalUserLevel = prizeLevel;

      if (finalUserLevel >= 15) {
        finalUserLevel = 15;
      } else if (finalUserLevel >= 10) {
        finalUserLevel = 10;
      } else if (finalUserLevel >= 5) {
        finalUserLevel = 5;
      }

      await updateDataInFirebase({
        selectedAnswer: selectedOption,
        finallyUserLevel: finalUserLevel,
        finallyIsCorrectAns: false,
        showRevealCorrect: realQuestAns,
      });
    }
  };

  return handleAnswerClick;
};
