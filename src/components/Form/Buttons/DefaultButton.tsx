import React from "react";
type DefaultButtonProps = {
  text: React.ReactNode;
  onclick?: () => void;
};

export const DefaultButton = ({ text, onclick }: DefaultButtonProps) => {
  return (
    <button
      onClick={onclick}
      type="submit"
      className=" bg-[#8A0089] text-white w-full text-center py-3 font-montserrat font-semibold text-xl rounded-lg shadow-inner"
    >
      {text}
    </button>
  );
};
