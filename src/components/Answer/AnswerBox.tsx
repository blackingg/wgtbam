import { cn } from "@/utils/util";

interface AnswerBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  option: string;
  answer: string;
  isBig?: boolean;
  disabled?: boolean;
  handleClick: () => void;
  selected: boolean;
}

export const AnswerBox = ({
  option,
  answer,
  isBig = false,
  disabled,
  handleClick,
  selected,
  className,
}: AnswerBoxProps) => {
  const isCorrect = option.includes(answer);

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
        className={`${selected && isCorrect && "bg-[#26C36D]"} ${
          selected && !isCorrect && "bg-[#EB1212]"
        } ${
          !selected && "bg-[#8A0089]"
        } angle shadow-inner w-full h-full text-white flex justify-center items-center py-2 ${
          isBig ? " tablet:py-6" : " tablet:py-4"
        } rounded-full min-h-[4rem]`}
      >
        <div className=" max-w-[60%] flex justify-center items-center">
          {option}
        </div>
      </span>
    </button>
  );
};
