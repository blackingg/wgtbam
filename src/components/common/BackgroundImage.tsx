import Image from "next/image";

export const BackgroundImage = () => {
  return (
    // <div className=" min-w-screen min-h-screen absolute z-[-1]">
    <Image
      src="/Images/purplebg.png"
      fill
      alt="Background image"
      placeholder="blur"
      blurDataURL="/Images/purplebg.png"
      quality={100}
      sizes="100vw, 100vh"
      priority
      className=" top-0 left-0 object-cover bg-no-repeat cursor-not-allowed min-w-screen min-h-screen z-[-1]"
      draggable={false}
    />
    // </div>
  );
};
