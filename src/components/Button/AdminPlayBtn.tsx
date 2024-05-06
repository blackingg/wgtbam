"use client";
import { useRouter } from "next/navigation";
import { ClickableMillionareBox, GoToChallenge } from "..";
import { useFirebaseListener } from "@/hooks";

export const AdminPlayBtn = ({
  route,
  onClick,
}: {
  route: string;
  onClick: () => void;
}) => {
  const router = useRouter();
  return <ClickableMillionareBox text="Lets Play!" onClick={onClick} />;
};
