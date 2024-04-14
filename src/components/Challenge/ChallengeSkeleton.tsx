"use client";
import React, { Fragment, useState } from "react";
import { QuestionBox } from "..";
import { AnswerBox } from "../Answer";

interface ChallengeSkeletonProps {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  // setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  handleAnswerClick: (selectedOption: string) => void;
  selectedAnswer: string | null;
}

export const ChallengeSkeleton = ({
  question,
  option1,
  option2,
  option3,
  option4,
  answer,
  // setIsAnswered,
  // setIsCorrect,
  handleAnswerClick,
  selectedAnswer,
}: ChallengeSkeletonProps) => {
  console.log("Answer: ", answer);

  return (
    <Fragment>
      <section>
        <div className=" relative">
          <div className=" bg-[#EAB95A] w-full h-[4.5px] z-[1] absolute left-[0%] top-[50%] translate-y-[-50%] " />
          <QuestionBox
            question={question}
            className=" text-sm px-[4px] z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] "
            isBig={true}
          />
          {/* <div className=" bg-[#EAB95A] w-[100px] h-[4.5px] z-[1] absolute right-[0%] top-[50%] translate-y-[-50%] " /> */}
        </div>
      </section>
      <section>
        <div className=" tablet:p-8 flex flex-col tablet:flex-row items-center justify-center gap-4 relative">
          <div className=" bg-[#EAB95A] w-full h-[4.5px] z-[1] absolute left-[0%] top-[50%] translate-y-[-50%] hidden tablet:block " />
          <AnswerBox
            option={`${
              option1 !== undefined && option1 !== "" ? "A. " + option1 : ""
            } `}
            answer={answer}
            selected={selectedAnswer === option1}
            handleClick={() => {
              if (option1 !== undefined) {
                handleAnswerClick(option1);
              }
            }}
            disabled={option1 !== undefined && option1 !== "" ? false : true}
          />
          {/* <div className=" bg-[#EAB95A] w-[100px] h-[4.5px] z-[1] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] " /> */}
          <AnswerBox
            option={`${
              option2 !== undefined && option2 !== "" ? "B. " + option2 : ""
            } `}
            answer={answer}
            selected={selectedAnswer === option2}
            handleClick={() => {
              if (option2 !== undefined) {
                handleAnswerClick(option2);
              }
            }}
            disabled={option2 !== undefined && option2 !== "" ? false : true}
          />
          {/* <div className=" bg-[#EAB95A] w-[100px] h-[4.5px] z-[1] absolute right-[0%] top-[50%] translate-y-[-50%] " /> */}
        </div>

        <div className=" py-4 ipad:py-8 ipad:px-8 flex flex-col tablet:flex-row items-center justify-center gap-4 relative">
          <div className=" bg-[#EAB95A] w-full h-[4.5px] z-[1] absolute left-[0%] top-[50%] translate-y-[-50%] hidden tablet:block " />
          <AnswerBox
            option={`${
              option3 !== undefined && option3 !== "" ? "C. " + option3 : ""
            } `}
            answer={answer}
            selected={selectedAnswer === option3}
            handleClick={() => {
              if (option3 !== undefined) {
                handleAnswerClick(option3);
              }
            }}
            disabled={option3 !== undefined && option3 !== "" ? false : true}
          />
          {/* <div className=" bg-[#EAB95A] w-[100px] h-[4.5px] z-[1] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] " /> */}
          <AnswerBox
            option={`${
              option4 !== undefined && option4 !== "" ? "D. " + option4 : ""
            } `}
            answer={answer}
            selected={selectedAnswer === option4}
            handleClick={() => {
              if (option4 !== undefined) {
                handleAnswerClick(option4);
              }
            }}
            disabled={option4 !== undefined && option4 !== "" ? false : true}
          />
          {/* <div className=" bg-[#EAB95A] w-[100px] h-[4.5px] z-[1] absolute right-[0%] top-[50%] translate-y-[-50%] " /> */}
        </div>
      </section>
    </Fragment>
  );
};
