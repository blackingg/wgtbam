"use client";
import React, { useState } from "react";

interface Question {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

// export const handleFiftyFifty = (
//   currentQuestion: Question,
//   currentQuestionIndex: number,
//   setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
//   setUsedFiftyFifty: React.Dispatch<React.SetStateAction<boolean>>
// ) => {
//   const options = [
//     currentQuestion.option1,
//     currentQuestion.option2,
//     currentQuestion.option3,
//     currentQuestion.option4,
//   ];

//   const correctAnswerIndex = options.indexOf(currentQuestion.answer);

//   let remainingIndices = Array.from({ length: options.length }, (_, i) => i);
//   remainingIndices.splice(correctAnswerIndex, 1); // Remove correct answer index

//   // Randomly select first option to remove
//   const firstOptionToRemoveIndex =
//     remainingIndices[Math.floor(Math.random() * remainingIndices.length)];

//   remainingIndices.splice(
//     remainingIndices.indexOf(firstOptionToRemoveIndex),
//     1
//   ); // Remove selected index

//   // Randomly select second option to remove
//   const secondOptionToRemoveIndex =
//     remainingIndices[Math.floor(Math.random() * remainingIndices.length)];

//   remainingIndices.splice(
//     remainingIndices.indexOf(secondOptionToRemoveIndex),
//     1
//   );

//   console.log("First Removed", firstOptionToRemoveIndex);
//   console.log("Second Removed", secondOptionToRemoveIndex);

//   console.log("Remaining Indices: ", remainingIndices);

//   console.log("Options: ", options);

//   // Update options array by removing options at selected indices
//   const updatedOptions = options
//     .map((option, index) => {
//       if (
//         index === firstOptionToRemoveIndex ||
//         index === secondOptionToRemoveIndex
//       ) {
//         return null; // Remove the option
//       }
//       return option;
//     })
//     .filter((option) => option !== null) as string[];
//   console.log("Updated Options: ", updatedOptions);

//   setQuestions((prevQuestions) => {
//     const updatedQuestions = [...prevQuestions];
//     updatedQuestions[currentQuestionIndex] = {
//       ...currentQuestion,
//       option1: updatedOptions[0],
//       option2: updatedOptions[1],
//       option3: updatedOptions[2],
//       option4: updatedOptions[3],
//     };
//     console.log("Updated Questions: ", updatedQuestions);

//     return updatedQuestions;
//   });

//   setUsedFiftyFifty(true);
// };

export const handleFiftyFifty = (
  currentQuestion: Question,
  currentQuestionIndex: number,
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
  setUsedFiftyFifty: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const options = [
    currentQuestion.option1,
    currentQuestion.option2,
    currentQuestion.option3,
    currentQuestion.option4,
  ];

  const correctAnswerIndex = options.indexOf(currentQuestion.answer);

  let remainingIndices = Array.from({ length: options.length }, (_, i) => i);
  remainingIndices.splice(correctAnswerIndex, 1); // Remove correct answer index

  // Randomly select first option to remove
  const firstOptionToRemoveIndex =
    remainingIndices[Math.floor(Math.random() * remainingIndices.length)];

  remainingIndices.splice(
    remainingIndices.indexOf(firstOptionToRemoveIndex),
    1
  ); // Remove selected index

  // Randomly select second option to remove
  const secondOptionToRemoveIndex =
    remainingIndices[Math.floor(Math.random() * remainingIndices.length)];

  remainingIndices.splice(
    remainingIndices.indexOf(secondOptionToRemoveIndex),
    1
  );

  // console.log("First Removed", firstOptionToRemoveIndex);
  // console.log("Second Removed", secondOptionToRemoveIndex);

  // console.log("Remaining Indices: ", remainingIndices);

  // console.log("Options: ", options);

  // Update options array by removing options at selected indices
  const updatedOptions = options.reduce((acc, option, index) => {
    if (
      index === firstOptionToRemoveIndex ||
      index === secondOptionToRemoveIndex
    ) {
      return [...acc, undefined]; // Replace the option with undefined
    }
    return [...acc, option];
  }, [] as (string | undefined)[]);

  // console.log("Updated Options: ", updatedOptions);

  setQuestions((prevQuestions) => {
    const updatedQuestions = [...prevQuestions];
    updatedQuestions[currentQuestionIndex] = {
      ...currentQuestion,
      option1: updatedOptions[0] || "", // Provide default value to handle undefined
      option2: updatedOptions[1] || "",
      option3: updatedOptions[2] || "",
      option4: updatedOptions[3] || "",
    };
    // console.log("Updated Questions: ", updatedQuestions);

    return updatedQuestions;
  });

  setUsedFiftyFifty(true);
};
