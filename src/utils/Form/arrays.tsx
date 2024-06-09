import { InputName } from "@/types";
import Image from "next/image";

export const InputsArr = [
  {
    label: "Email",
    Icon: <Image src="/Images/mailIcon.svg" alt="img" width={20} height={20} className=" w-5 h-5" />,
    name: "email" as InputName,
    label2: "e.g. xyz@gmail.com",
  },
  {
    label: "Faculty",
    Icon: null,
    name: "faculty" as InputName,
    label2: "e.g Sciences",
  },
  {
    label: "Department",
    Icon: null,
    name: "dept" as InputName,
    label2: "e.g Botany",
  },
  {
    label: "Phone Number",
    Icon: null,
    name: "phoneNo" as InputName,
    label2: "e.g 08105323431",
  },
];
