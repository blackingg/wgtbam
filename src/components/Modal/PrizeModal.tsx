"use client";
import { BackgroundImage, PrizePool } from "..";
import { useQuestionStore } from "@/zustand/store";

export const PrizeModal = () => {
  const {
    openPrize,
    usedFifty,
    usedPhone,
    usedAudience,
    prizeLevel,
    updateDataInFirebase,
  } = useQuestionStore();

  const closeModal = async () => {
    await updateDataInFirebase({
      openPrize: false,
    });
  };

  return (
    <>
      {openPrize && (
        <div
          onClick={closeModal}
          className=" overflow-hidden min-h-screen backdrop-blur-lg fixed left-0 top-0 w-screen grid place-items-center z-[999995]"
        >
          <BackgroundImage />
          <div
            onClick={(e) => e.stopPropagation()}
            className=" relative z-[999999] bg-opacity-[0.15] backdrop-blur-sm shadow-md w-full h-full flex justify-center items-center"
          >
            <PrizePool
              prizeLevel={prizeLevel}
              usedFifty={usedFifty}
              usedAudience={usedAudience}
              usedPhone={usedPhone}
            />
          </div>
        </div>
      )}
    </>
  );
};
