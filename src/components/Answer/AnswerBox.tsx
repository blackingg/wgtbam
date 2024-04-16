import { cn } from "@/utils/util";

interface AnswerBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  option: string;
  answer: string;
  isBig?: boolean;
  disabled?: boolean;
  handleClick: () => void;
  selected: boolean;
  isConfirm: boolean;
  revealedCorrect: boolean;
  actualCorrectAns: boolean;
  showRevealCorrect: string;
  className2?: string;
}

export const AnswerBox = ({
  option,
  answer,
  isBig = false,
  disabled,
  handleClick,
  selected,
  isConfirm,
  revealedCorrect,
  actualCorrectAns,
  showRevealCorrect,
  className,
  className2,
}: AnswerBoxProps) => {
  const isCorrect = option === answer;

  // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");

  // console.log("Is correct: ", isCorrect);
  // console.log("reveal clicked ", revealedCorrect);

  const JustShowCorrectAns = isCorrect === true && revealedCorrect === true;

  // console.log("Last last", JustShowCorrectAns);
  // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  const isConfirmed =
    selected === true &&
    isConfirm === true &&
    actualCorrectAns === true &&
    isCorrect === true;

  const ConfirmNWrong =
    selected === true &&
    isConfirm === true &&
    actualCorrectAns === false &&
    isCorrect === false;

  const NotConfirmed =
    selected === true &&
    isConfirm === false &&
    actualCorrectAns === true &&
    isCorrect === true;

  const isRevealed =
    selected === true &&
    revealedCorrect === true &&
    actualCorrectAns === true &&
    isCorrect === true;

  const RevealedNWrong =
    selected === true &&
    revealedCorrect === true &&
    actualCorrectAns === false &&
    isCorrect === false;

  const NotRevealed =
    selected === true &&
    revealedCorrect === false &&
    actualCorrectAns === true &&
    isCorrect === true;

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full shadow-xl bg-[#EAB95A] shadow-[#EAB95A] angle border-y-[3px] border-[#EAB95A] px-[3.5px] rounded-full flex justify-center items-center z-20 font-montserrat tablet:font-semibold font-normal tablet:text-2xl text-xs text-center",
        className
      )}
      disabled={disabled}
    >
      <span
        className={cn(
          `
        ${isConfirmed && "bg-[#26C36D]"}

        ${ConfirmNWrong && "bg-[#EB1212]"}

        ${NotConfirmed && "bg-[#F9A61D]"} 

        ${NotRevealed && "bg-[#F9A61D]"} 
        ${
          !selected && "bg-[#8A0089]"
        } angle shadow-inner w-full h-full text-white flex justify-center items-center py-2 ${
            isBig ? " ipad:py-6" : " ipad:py-4"
          } rounded-full min-h-[2rem] ipad:min-h-[4rem]`,
          className2
        )}
      >
        <div className=" max-w-[60%] flex justify-center items-center">
          {option}
        </div>
      </span>
    </button>
  );
};
