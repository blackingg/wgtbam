import { cn } from "@/utils";

interface AnswerBoxProps extends React.HTMLAttributes<HTMLButtonElement> {
  option: string;
  answer: string; // Now the answer will be "a", "b", "c", or "d"
  isBig?: boolean;
  disabled?: boolean;
  handleClick: () => Promise<void>;
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
  const isCorrect = option.charAt(0).toLowerCase() === answer;

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

  const NotRevealed =
    selected === true &&
    revealedCorrect === false &&
    actualCorrectAns === true &&
    isCorrect === true;

  return (
    <button
      onClick={handleClick}
      className={cn(
        "angle z-20 flex w-full items-center justify-center rounded-full border-y-[3px] border-[#EAB95A] bg-[#EAB95A] px-[3.5px] text-center font-montserrat text-xs font-normal shadow-xl shadow-[#EAB95A] tablet:text-2xl tablet:font-semibold",
        className,
      )}
      disabled={disabled}
    >
      <span
        className={cn(
          ` ${isConfirmed && "bg-[#26C36D]"} ${ConfirmNWrong && "bg-[#EB1212]"} ${NotConfirmed && "bg-[#F9A61D]"} ${NotRevealed && "bg-[#F9A61D]"} ${
            !selected &&
            "bg-gradient-to-b from-[#6F006E] via-[#8A0089] to-[#6F006E]"
          } angle flex h-full w-full items-center justify-center py-2 text-white shadow-inner md:min-h-[75px] lg:min-h-full ${
            isBig ? "ipad:py-6" : "ipad:py-4"
          } min-h-[2rem] rounded-full ipad:min-h-[4rem]`,
          className2,
        )}
      >
        <span className="flex max-w-[60%] items-center justify-center">
          {option}
        </span>
      </span>
    </button>
  );
};
