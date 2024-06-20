import { cn } from "@/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
}

export const DefaultButton = ({ text, onClick }: DefaultButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="shadow-inne items-centerr flex w-full justify-center rounded-lg bg-[#8A0089] py-3 text-center font-montserrat text-xl font-semibold text-white"
    >
      {text}
    </button>
  );
};

interface CustomizableProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  BtnContent: ReactNode;
}

export const CustomizableBtn = ({
  BtnContent,
  className,
  ...props
}: CustomizableProps) => {
  return (
    <button
      type="submit"
      className={cn(
        `shadow-inne items-centerr flex w-full items-center justify-center rounded-lg bg-[#8A0089] py-3 text-center font-montserrat text-xl font-semibold text-white`,
        className,
      )}
      {...props}
    >
      {BtnContent}
    </button>
  );
};
