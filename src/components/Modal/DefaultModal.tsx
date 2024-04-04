"use client";
import { ReactNode } from "react";
import { DefaultButton } from "..";

type ModalWImageProps = {
  Image: ReactNode;
  Text: ReactNode;
  anythingelse?: ReactNode;
  ButtonLabel?: string;
  label: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  closeAction?: () => void;
};

export const DefaultModal = ({
  Image,
  Text,
  anythingelse,
  ButtonLabel,
  label,
  isOpen,
  setIsOpen,
  closeAction,
}: ModalWImageProps) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={closeModal}
          className=" bg-black/70 backdrop-blur-lg fixed left-0 top-0 w-screen h-screen grid place-items-center z-[999995] px-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" relative z-[999999] bg-gradient-to-br from-white/10 to-white/0 bg-opacity-[0.15] backdrop-blur-sm shadow-md w-full max-w-[593px] min-h-[487px] p-5 tablet:p-10 grid place-items-center gap-6 text-center font-montserrat border border-white rounded-3xl"
          >
            {Image}
            <h1 className=" font-extrabold text-lg tablet:text-[28px] text-white font-montserrat">
              {label}
            </h1>
            {Text}
            {anythingelse}
            <DefaultButton
              text={ButtonLabel ? ButtonLabel : "Close"}
              onclick={() => {
                closeModal();
                closeAction && closeAction();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
