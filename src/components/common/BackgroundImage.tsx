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
      className="min-w-screen left-0 top-0 z-[-1] min-h-[100vh] cursor-not-allowed bg-no-repeat object-cover"
      draggable={false}
    />
    // </div>
  );
};
