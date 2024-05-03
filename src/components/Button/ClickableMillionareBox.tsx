import { MillionareBtn, MillionareBtnProps } from ".";

export const ClickableMillionareBox = ({
  text,
  ...props
}: MillionareBtnProps) => {
  return (
    <div className=" relative w-full">
      <div className=" bg-[#EAB95A] w-full h-[4.5px] z-[-1] absolute left-[0%] top-[50%] translate-y-[-50%] hidden tablet:block " />
      <MillionareBtn text={text} {...props} />
    </div>
  );
};
