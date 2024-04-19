"use client";
import { useQuestionStore } from "@/zustand/store";
import { Question } from "../types/Question";

// export const handleFiftyFifty = async () => {
//   const allQuestions = useQuestionStore.getState().allQuestions;
//   const currentChallengeIndex =
//     useQuestionStore.getState().currentChallengeIndex;

//   const options = [
//     allQuestions[currentChallengeIndex].option1,
//     allQuestions[currentChallengeIndex].option2,
//     allQuestions[currentChallengeIndex].option3,
//     allQuestions[currentChallengeIndex].option4,
//   ];

//   const correctAnswerIndex = options.indexOf(
//     allQuestions[currentChallengeIndex].answer
//   );

//   let remainingIndices = Array.from({ length: options.length }, (_, i) => i);
//   remainingIndices.splice(correctAnswerIndex, 1);

//   const firstOptionToRemoveIndex =
//     remainingIndices[Math.floor(Math.random() * remainingIndices.length)];

//   remainingIndices.splice(
//     remainingIndices.indexOf(firstOptionToRemoveIndex),
//     1
//   );

//   const secondOptionToRemoveIndex =
//     remainingIndices[Math.floor(Math.random() * remainingIndices.length)];

//   remainingIndices.splice(
//     remainingIndices.indexOf(secondOptionToRemoveIndex),
//     1
//   );

//   const updatedOptions = options.reduce((acc, option, index) => {
//     if (
//       index === firstOptionToRemoveIndex ||
//       index === secondOptionToRemoveIndex
//     ) {
//       return [...acc, undefined];
//     }
//     return [...acc, option];
//   }, [] as (string | undefined)[]);

//   // useQuestionStore
//   //   .getState()
//   //   .setAllQuestions(updatedOptions, currentChallengeIndex);

//   // useQuestionStore.setState({ usedFifty: true });
// };

export const handleFiftyFifty = (
  allQuestions: Question[],
  challengeIndex: number
) => {
  const options = [
    allQuestions[challengeIndex].option1,
    allQuestions[challengeIndex].option2,
    allQuestions[challengeIndex].option3,
    allQuestions[challengeIndex].option4,
  ];

  console.log("Whast i gottt", challengeIndex);

  const correctAnswerIndex = options.indexOf(
    allQuestions[challengeIndex].answer
  );

  let remainingIndices = Array.from({ length: options.length }, (_, i) => i);
  remainingIndices.splice(correctAnswerIndex, 1);

  const firstOptionToRemoveIndex =
    remainingIndices[Math.floor(Math.random() * remainingIndices.length)];

  remainingIndices.splice(
    remainingIndices.indexOf(firstOptionToRemoveIndex),
    1
  );

  const secondOptionToRemoveIndex =
    remainingIndices[Math.floor(Math.random() * remainingIndices.length)];

  remainingIndices.splice(
    remainingIndices.indexOf(secondOptionToRemoveIndex),
    1
  );

  const updatedOptions = options.reduce((acc, option, index) => {
    if (
      index === firstOptionToRemoveIndex ||
      index === secondOptionToRemoveIndex
    ) {
      return [...acc, undefined];
    }
    return [...acc, option];
  }, [] as (string | undefined)[]);

  return { updatedOptions, challengeIndex };
};
