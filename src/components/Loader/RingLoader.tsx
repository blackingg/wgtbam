import Image from 'next/image';

export const RingLoader = () => {
  return (
    <div className=" fixed z-[99999] top-0 left-0 flex justify-center items-center w-screen h-screen purplebg">
      <Image src="/Images/loaderImg.svg" alt='loader' className=' w-[200px] h-auto' width={200} height={200}/>
    </div>
  );
};
