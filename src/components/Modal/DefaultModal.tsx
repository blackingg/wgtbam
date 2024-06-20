"use client";
import { Dispatch, Fragment, ReactNode } from "react";
import { DefaultButton } from "../Form/Buttons/DefaultButton";
import ReactDOM from "react-dom";

interface ModalWImageProps {
  Image: ReactNode;
  Text: ReactNode;
  anythingelse?: ReactNode;
  ButtonLabel?: string;
  label: string;
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  closeAction?: () => void;
}

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
          className="fixed left-0 top-0 z-[999995] grid h-[100dvh] w-screen place-items-center bg-black/70 px-5 backdrop-blur-lg"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-[999999] grid min-h-[487px] w-full max-w-[593px] place-items-center gap-6 rounded-3xl border border-white bg-opacity-[0.15] bg-gradient-to-br from-white/10 to-white/0 p-5 text-center font-montserrat shadow-md backdrop-blur-sm tablet:p-10"
          >
            {Image}
            <h1 className="font-montserrat text-lg font-extrabold text-white tablet:text-[28px]">
              {label}
            </h1>
            {Text}
            {anythingelse}
            <DefaultButton
              text={ButtonLabel ? ButtonLabel : "Close"}
              onClick={() => {
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

export const AltModal = ({
  Image,
  Text,
  ButtonLabel,
  label,
  isOpen,
  setIsOpen,
  closeAction,
}: ModalWImageProps) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return ReactDOM.createPortal(
    <Fragment>
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed left-0 top-0 z-[50] grid h-[100dvh] w-screen place-items-center bg-black/70 px-5 text-white backdrop-blur-lg"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-[50] grid min-h-[300px] w-full max-w-[500px] place-items-center gap-6 rounded-3xl border border-white bg-opacity-[0.15] bg-gradient-to-br from-white/10 to-white/0 p-5 text-center font-montserrat shadow-md backdrop-blur-sm"
          >
            {Image}
            <h1 className="font-montserrat text-xl font-extrabold text-white tablet:text-[28px]">
              {label}
            </h1>
            {Text}
            <DefaultButton
              text={ButtonLabel ? ButtonLabel : "Close"}
              onClick={() => {
                closeModal();
                closeAction && closeAction();
              }}
            />
          </div>
        </div>
      )}
    </Fragment>,
    document.body,
  );
};
