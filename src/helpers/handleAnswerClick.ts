import { State } from "@/zustand/store";

export const handleQuestAnswer = ({
  selectedAnswer,
  realQuestAns,
  prizeLevel,
  currentuserlevel,
  updateDataInFirebase,
}: {
  selectedAnswer: string;
  realQuestAns: string;
  prizeLevel: number;
  currentuserlevel: number;
  updateDataInFirebase: (data: Partial<State>) => Promise<void>;
}) => {
  const handleAnswerClick = async (selectedOption: string) => {
    if (selectedAnswer === "") {
      await updateDataInFirebase({
        isAnswered: true,
      });
      if (selectedOption === realQuestAns) {
        let updatedPrizeLvl = prizeLevel + 1;
        await updateDataInFirebase({
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

        await updateDataInFirebase({
          selectedAnswer: selectedOption,
          finallyUserLevel: currentuserlevel,
          finallyIsCorrectAns: false,
          showRevealCorrect: realQuestAns,
        });
      }
    }
  };

  return handleAnswerClick;
};
