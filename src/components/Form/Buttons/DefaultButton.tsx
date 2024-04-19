import { ButtonHTMLAttributes, ReactNode } from "react";
interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
  
};

export const DefaultButton = ({ text, onClick }: DefaultButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className=" bg-[#8A0089] text-white w-full text-center py-3 font-montserrat font-semibold text-xl rounded-lg shadow-inner"
    >
      {text}
    </button>
  );
};
