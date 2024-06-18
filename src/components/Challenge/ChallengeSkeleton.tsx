import { AnswerBox } from "../Answer";
import { NonClickableMillionareBox } from "../Button";

interface ChallengeSkeletonProps {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  // handleAnswerClick: (selectedOption: string) => void;
  handleAnswerClick: (selectedOption: string) => Promise<void>;
  selectedAnswer: string;
  isConfirm: boolean;
  revealedCorrect: boolean;
  actualCorrectAns: boolean;
  showRevealCorrect: string;
}

export const ChallengeSkeleton = ({
  question,
  option1,
  option2,
  option3,
  option4,
  answer,
  handleAnswerClick,
  selectedAnswer,
  isConfirm,
  revealedCorrect,
  actualCorrectAns,
  showRevealCorrect,
}: ChallengeSkeletonProps) => {
  const options = [option1, option2, option3, option4];
  return (
    <div className="flex w-full flex-col gap-10 largerdesktop:gap-10">
      <NonClickableMillionareBox text={question} />
      <div className="flex flex-col gap-y-4 ipad:gap-y-8">
        {[1, 2].map((group) => (
          <div
            key={`${group} group`}
            className={`relative flex flex-col items-center justify-center gap-4 tablet:flex-row ipad:px-8`}
          >
            <div className="absolute left-[0%] top-[50%] z-[1] hidden h-[4.5px] w-full translate-y-[-50%] bg-[#EAB95A] tablet:block" />
            {options.slice((group - 1) * 2, group * 2).map((option, index) => (
              <AnswerBox
                key={index}
                option={`${
                  option !== ""
                    ? `${
                        group === 1
                          ? String.fromCharCode(65 + index)
                          : String.fromCharCode(65 + (2 + index))
                      }. ${option}`
                    : ""
                }
                  `}
                answer={answer}
                selected={selectedAnswer !== "" && selectedAnswer === option}
                handleClick={() => handleAnswerClick(option)}
                disabled={option !== undefined && option !== "" ? false : true}
                isConfirm={isConfirm}
                revealedCorrect={revealedCorrect}
                actualCorrectAns={actualCorrectAns}
                showRevealCorrect={showRevealCorrect}
                className2={`${
                  selectedAnswer === option &&
                  answer === option &&
                  revealedCorrect &&
                  "bg-[#26C36D]"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
