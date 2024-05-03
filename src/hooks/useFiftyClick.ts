import { handleFiftyFifty } from "@/helpers";
import { Question } from "@/types";

interface FiftyClickProps {
    allQuestions: Question[];
    currentChallengeIndex: number;
}

  export const useFiftyClick = ({allQuestions, currentChallengeIndex}: FiftyClickProps) => {
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

    return newData;
  };