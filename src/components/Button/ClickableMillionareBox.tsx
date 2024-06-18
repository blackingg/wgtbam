import { MillionareBtn, MillionareBtnProps } from "./MillionareBtn";

export const ClickableMillionareBox = ({
  text,
  ...props
}: MillionareBtnProps) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-[0%] top-[50%] z-[-1] hidden h-[4.5px] w-full translate-y-[-50%] bg-[#EAB95A] tablet:block" />
      <MillionareBtn text={text} {...props} />
    </div>
  );
};
