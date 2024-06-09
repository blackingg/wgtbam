"use client";
import { ClickableMillionareBox } from "..";

export const AdminPlayBtn = ({
  onClick,
}: {
  route: string;
  onClick: () => void;
}) => {
  return <ClickableMillionareBox text="Lets Play!" onClick={onClick} />;
};
