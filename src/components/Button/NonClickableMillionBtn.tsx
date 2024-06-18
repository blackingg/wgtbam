import { NonClickableMillionareBtnProps } from "@/types";
import { MillionareContainer } from "../common";

export const NonClickableMillionareBox = ({
  text,
  ...props
}: NonClickableMillionareBtnProps) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-[0%] top-[50%] z-[0] hidden h-[4.5px] w-full translate-y-[-50%] bg-[#EAB95A] tablet:block" />
      <MillionareContainer text={text} {...props} />
    </div>
  );
};
