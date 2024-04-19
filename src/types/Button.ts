import { ButtonHTMLAttributes } from "react";

export interface AnswerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btntext: string;
}