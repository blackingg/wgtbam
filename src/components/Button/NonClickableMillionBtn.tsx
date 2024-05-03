import { NonClickableMillionareBtnProps } from "@/types";
import { MillionareContainer } from "..";

export const NonClickableMillionareBox = ({
  text,
  ...props
}: NonClickableMillionareBtnProps) => {
  return (
    <div className=" relative w-full">
      <div className=" bg-[#EAB95A] w-full h-[4.5px] z-[0] absolute left-[0%] top-[50%] translate-y-[-50%] hidden tablet:block " />
      <MillionareContainer text={text} {...props} />
    </div>
  );
};
