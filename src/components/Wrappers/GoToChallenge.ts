"use client"

import { useRouter } from 'next/navigation';

export const GoToChallenge = () => {
   const router = useRouter();

  function goToChallenge() {
    router.push("/admin/challenge");
  }

  return goToChallenge;
}
