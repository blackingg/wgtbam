"use client"

import { useRouter } from 'next/navigation';

export const GoToChallenge = (route: string, callback? : () => void) => {
   const router = useRouter();

  function goToChallenge() {
    router.push(route);
    
    callback && callback();
  }

  return goToChallenge;
}
