import { database } from "@/firebase";
import { isEqual } from "@/utils";
import { useQuestionStore } from "@/zustand/store";
import { DataSnapshot, off, onValue, ref } from "firebase/database";
import { useEffect } from "react";

export const useFirebaseListener = () => {
  // const updateDataInStore = useQuestionStore(
  //   (state) => state.updateDataInStore
  // );

  useEffect(() => {
    const dbRef = ref(database, "questionStore");

    const listener = async (snapshot: DataSnapshot) => {
      const newData: typeof stateToSave = await snapshot.val();

      const {
        setAllQuestions,
        setCurrentChallengeIndex,
        setUsedFifty,
        setUsedPhone,
        setUsedAudience,
        setIsAnswered,
        setIsCorrect,
        setPrizeLevel,
        setSelectedAnswer,
        setOpenPrize,
        setIsConfirmed,
        setFinallyIsCorrectAns,
        setFinallyUserLevel,
        setRevealCorrectAnswer,
        setShowRevealCorrect,
        setGoToNextQuestion,
        setQuestionArr,
        updateDataInFirebase,
        updateDataInStore,
        setGoToHome,
        setShowCheckpoint,
        setLetsPlay,
        setGoToTotal,
        setContinueChallenge,
        ...stateToSave
      } = useQuestionStore.getState();

      if (newData && !isEqual(newData, stateToSave)) {
        updateDataInStore(newData);
        console.log("From firebase", newData);
      }
    };

    onValue(dbRef, listener);

    return () => {
      off(dbRef, "value", listener);
    };
  }, []);
};
