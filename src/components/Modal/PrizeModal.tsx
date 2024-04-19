"use client";
import React, { useEffect } from "react";
import { PrizePool } from "..";
import { useQuestionStore } from "@/zustand/store";
import { checkIsClient, isEqual } from "@/utils";
import { DataSnapshot, off, onValue, ref } from "firebase/database";
import { database } from "@/firebase";

export const PrizeModal = () => {
  const openPrize = useQuestionStore((state) => state.openPrize);
  const setOpenPrize = useQuestionStore((state) => state.setOpenPrize);
  const usedFifty = useQuestionStore((state) => state.usedFifty);
  const usedPhone = useQuestionStore((state) => state.usedPhone);
  const usedAudience = useQuestionStore((state) => state.usedAudience);
  const prizeLevel = useQuestionStore((state) => state.prizeLevel);
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );

  const closeModal = () => {
    // setOpenPrize(false);
    updateDataInFirebase({
      openPrize: false,
    });
  };

  useEffect(() => {
    const dbRef = ref(database, "questionStore");

    const listener = (snapshot: DataSnapshot) => {
      const newData = snapshot.val();
      console.log("New values from Firebase??", newData);
      if (newData && !isEqual(newData, useQuestionStore.getState())) {
        updateDataInFirebase(newData);
      }
    };

    onValue(dbRef, listener);

    return () => {
      off(dbRef, "value", listener);
    };
  }, []);

  const isClient = checkIsClient();

  return (
    <>
      {openPrize && isClient && (
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
