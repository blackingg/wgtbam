"use client";

import { useFirebaseListener } from "@/hooks";
import { useQuestionStore } from "@/zustand/store";
import { useEffect } from "react";

export const GoToHome = () => {
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );
  useFirebaseListener();

  useEffect(() => {
    const Run = async () => {
      await updateDataInFirebase({
        goToHome: true,
      });
    };

    Run();
  }, []);
};
