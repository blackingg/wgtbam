"use client";
import { ReactNode, forwardRef } from "react";
type InputProps = {
  label: string | ReactNode;
  Errorlabel: string | ReactNode;
  Icon?: ReactNode;
  label2?: string;
};

export const DefaultInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, Icon, Errorlabel, label2, ...props }, ref) => {
    return (
      <div className=" font-poppins text-base text-white/90 font-normal">
        <label>{Errorlabel ? Errorlabel : label}</label>
        <div className=" mt-1 relative">
          <input
            ref={ref}
            {...props}
            className=" pl-[16px] border-[1px] border-white/80 rounded-lg h-[50px] w-full input-glassl input-gradientl bg-white/10 backdrop-blur-sm shadow-md placeholder:font-poppins placeholder:text-white/50"
            placeholder={label2 ? label2 : (label as string)}
          />
          {Icon && (
            <span className=" absolute top-[50%] right-[16px] translate-y-[-50%]">
              {Icon}
            </span>
          )}
        </div>
      </div>
    );
  }
);

DefaultInput.displayName = "DefaultInput";