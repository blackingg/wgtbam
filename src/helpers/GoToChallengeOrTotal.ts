"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const GoToChallengeOrTotal = ({
  goToTotal,
  continueChallenge,
  user = "player",
}: {
  goToTotal: boolean;
  continueChallenge: boolean;
  user?: string;
}) => {
  const router = useRouter();
  useEffect(() => {
    goToTotal === true &&
      router.push(user === "admin" ? "/admin/total" : "/total");
    continueChallenge === true &&
      router.push(user === "admin" ? "/admin/challenge" : "/challenge");
  }, [goToTotal, continueChallenge]);
};
