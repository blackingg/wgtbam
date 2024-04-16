import { cn } from "@/utils";

interface AnswerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btntext: string;
}

export const ConfirmationBtn = ({
  btntext,
  className,
  ...rest
}: AnswerButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        " font-bold font-montserrat text-sm tablet:text-xl text-white rounded-[72px] shadow-2xl bg-[#086B35] px-7 py-3",
        className
      )}
    >
      {btntext}
    </button>
  );
};
