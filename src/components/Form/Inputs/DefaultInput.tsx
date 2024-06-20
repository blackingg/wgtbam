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
      <div className="font-poppins text-sm font-normal text-white/90 lg:text-base">
        <label>{Errorlabel ? Errorlabel : label}</label>
        <div className="relative mt-1">
          <input
            ref={ref}
            {...props}
            className="input-glassl input-gradientl h-[40px] w-full rounded-lg border-[1px] border-white/80 bg-white/10 pl-[16px] shadow-md backdrop-blur-sm placeholder:font-poppins placeholder:text-white/50 lg:h-[45px]"
            placeholder={label2 ? label2 : (label as string)}
          />
          {Icon && (
            <span className="absolute right-[16px] top-[50%] translate-y-[-50%]">
              {Icon}
            </span>
          )}
        </div>
      </div>
    );
  },
);

DefaultInput.displayName = "DefaultInput";
