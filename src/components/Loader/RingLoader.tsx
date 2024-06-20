import Image from "next/image";

export const RingLoader = () => {
  return (
    <div className="purplebg fixed left-0 top-0 z-[99999] flex h-[100vh] w-screen items-center justify-center">
      <Image
        src="/Images/loaderImg.svg"
        alt="loader"
        className="h-auto w-[200px]"
        width={200}
        height={200}
      />
    </div>
  );
};
