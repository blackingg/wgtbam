"use client";

import { useQuestionStore } from "@/zustand/store";
import { useRouter } from "next/navigation";

export const useGoToQuestion = ({ route }: { route: string }) => {
  const router = useRouter();
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );

  async function GoToQuestion() {
    await updateDataInFirebase({
      continueChallenge: true,
      showCheckpoint: false,
    });
    router.push(route ?? "");
  }
  return GoToQuestion;
};
