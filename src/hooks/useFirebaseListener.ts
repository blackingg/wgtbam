import { database } from "@/firebase";
import { isEqual } from "@/utils";
import { useQuestionStore } from "@/zustand/store";
import { DataSnapshot, off, onValue, ref } from "firebase/database";
import { useEffect } from "react";

export const useFirebaseListener = () => {
  const updateDataInStore = useQuestionStore(
    (state) => state.updateDataInStore
  );

  useEffect(() => {
    const dbRef = ref(database, "questionStore");

    const listener = async (snapshot: DataSnapshot) => {
      const newData = await snapshot.val();
      if (newData && !isEqual(newData, useQuestionStore.getState())) {
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
