"use client"

import { useFirebaseListener } from '@/hooks';
import { useEffect } from 'react'

export const GoToHome = () => {
  const { updateDataInStore, updateDataInFirebase } = useFirebaseListener();

  useEffect(() => {
    updateDataInFirebase({
      goToHome: false,
    });
    console.log("Effect called, to go to home");
    
  }, []);
}
