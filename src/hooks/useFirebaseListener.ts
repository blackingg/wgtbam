import { database } from '@/firebase';
import { isEqual } from '@/utils';
import { useQuestionStore } from '@/zustand/store';
import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import React, { useEffect } from 'react'

export const useFirebaseListener = () => {
     const updateDataInStore = useQuestionStore(
    (state) => state.updateDataInStore
  );
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );

  useEffect(() => {
    const dbRef = ref(database, "questionStore");

    const listener = (snapshot: DataSnapshot) => {
      const newData = snapshot.val();
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

  return {updateDataInStore, updateDataInFirebase}
}
