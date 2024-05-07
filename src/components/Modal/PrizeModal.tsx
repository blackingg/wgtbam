"use client";
import { useEffect } from "react";
import { BackgroundImage, PrizePool } from "..";
import { useQuestionStore } from "@/zustand/store";
// import { useShallow } from "zustand/react/shallow";

export const PrizeModal = () => {
  const openPrize = useQuestionStore((state) => state.openPrize);

  // const updateDataInFirebase = useQuestionStore(
  //   useShallow((state) => state.updateDataInFirebase)
  // );

  // const closeModal = async () => {
  //   await updateDataInFirebase({
  //     openPrize: false,
  //   });
  // };

  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );

  useEffect(() => {
    async function Run() {
      if (openPrize === true) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await updateDataInFirebase({
          openPrize: false,
        });
      }
    }
    Run();
  }, []);

  return (
    <>
      {openPrize && (
        <div
          // onClick={closeModal}
          className=" overflow-hidden min-h-screen backdrop-blur-lg fixed left-0 top-0 w-screen grid place-items-center z-[999995]"
        >
          <BackgroundImage />
          <div
            onClick={(e) => e.stopPropagation()}
            className=" relative z-[999999] bg-opacity-[0.15] backdrop-blur-sm shadow-md w-full h-full flex justify-center items-center"
          >
            <PrizePool
            // prizeLevel={prizeLevel}
            // usedFifty={usedFifty}
            // usedAudience={usedAudience}
            // usedPhone={usedPhone}
            />
          </div>
        </div>
      )}
    </>
  );
};
