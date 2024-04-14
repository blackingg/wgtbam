import React from "react";
import { PrizePool } from "..";

interface PrizeModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeAction?: () => void;
  prizeLevel: number;
  usedFifty: boolean;
  usedAudience: boolean;
  usedPhone: boolean;
}

export const PrizeModal = ({
  isOpen,
  setIsOpen,
  closeAction,
  prizeLevel,
  usedFifty,
  usedAudience,
  usedPhone,
}: PrizeModalProps) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={closeModal}
          className=" purplebg overflow-y-hidden backdrop-blur-lg fixed left-0 top-0 w-screen h-screen grid place-items-center z-[999995]"
        >
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
