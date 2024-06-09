"use client";

import { Question } from "@/types";

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
