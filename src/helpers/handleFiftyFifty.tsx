"use client";

interface Options {
  a: string;
  b: string;
  c: string;
  d: string;
}

interface QuestionData {
  answer: string;
  difficulty_level: string;
  id: number;
  options: Options;
  // qid: string;
  // qtype: string;
  question: string;
  // status: string;
}

export const handleFiftyFifty = (options: Options, answer: string) => {
  const optionKeys = ["a", "b", "c", "d"];
  const optionArray = [options.a, options.b, options.c, options.d];
  const correctAnswerIndex = optionKeys.indexOf(answer);

  let remainingIndices = Array.from(
    { length: optionArray.length },
    (_, i) => i,
  );
  remainingIndices.splice(correctAnswerIndex, 1);

  const firstOptionToRemoveIndex =
    remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
  remainingIndices.splice(
    remainingIndices.indexOf(firstOptionToRemoveIndex),
    1,
  );

  const secondOptionToRemoveIndex =
    remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
  remainingIndices.splice(
    remainingIndices.indexOf(secondOptionToRemoveIndex),
    1,
  );

  const updatedOptions = optionArray.map((option, index) => {
    if (
      index === firstOptionToRemoveIndex ||
      index === secondOptionToRemoveIndex
    ) {
      return undefined;
    }
    return option;
  });

  return {
    a: updatedOptions[0] || "",
    b: updatedOptions[1] || "",
    c: updatedOptions[2] || "",
    d: updatedOptions[3] || "",
  };
};
