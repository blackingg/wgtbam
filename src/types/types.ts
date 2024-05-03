import { HTMLAttributes } from "react";

export type User = {
  faculty: string;
  email: string;
  dept: string;
  phoneNo: number;
};

export type InputName = "faculty" | "email" | "dept" | "phoneNo";

export interface NonClickableMillionareBtnProps
  extends HTMLAttributes<HTMLDivElement> {
  text: string;
  className2?: string;
}