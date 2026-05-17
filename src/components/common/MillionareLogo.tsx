import Image from "next/image";
import { cn } from "@/utils/util";

interface MillionareLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const MillionareLogo = ({
  className,
  width = 250,
  height = 250,
}: MillionareLogoProps) => {
  return (
    <div className=" relative w-full h-full ">
      <Image
        src="/Images/logo.png"
        alt="WGTBAM Logo"
        width={width}
        height={height}
        priority
        quality={100}
        sizes="150px, 250px, 350px, 450px"
        className={cn(
          "object-cover bg-no-repeat w-full h-full flex justify-center items-center mx-auto cursor-not-allowed",
          className ? className : "max-w-[150px] tablet:max-w-[250px] max-h-[150px] tablet:max-h-[250px]"
        )}
        draggable={false}
      />
    </div>
  );
};

