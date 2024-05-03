import Image from "next/image";

export const BackgroundImage = () => {
  return (
    <div className=" min-w-full min-h-full absolute z-[-1]">
      <Image
        src="/Images/purplebg.svg"
        fill
        alt="Background image"
        placeholder="blur"
        blurDataURL="/Images/purplebg.svg"
        quality={100}
        sizes="100%, 100%"
        priority
        className=" object-cover bg-no-repeat z-[-1] cursor-not-allowed min-w-full min-h-full"
        draggable={false}
      />
    </div>
  );
};
