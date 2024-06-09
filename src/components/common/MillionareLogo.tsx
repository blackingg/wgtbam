import Image from "next/image";

export const MillionareLogo = () => {
  return (
    <div className=" relative w-full h-full ">
      <Image
        src="/Images/logo2.png"
        alt="WGTBAM Logo"
        width={250}
        height={250}
        priority
        placeholder="blur"
        blurDataURL="/Images/logo2.png"
        quality={100}
        sizes="150px, 250px, 350px"
        className=" object-cover bg-no-repeat max-w-[150px] tablet:max-w-[250px] max-h-[150px] tablet:max-h-[250px] w-full h-full flex justify-center items-center mx-auto cursor-not-allowed"
        draggable={false}
      />
    </div>
  );
};
