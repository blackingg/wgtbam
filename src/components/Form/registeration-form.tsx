"use client";

import { Fragment, useState } from "react";
import { DefaultButton } from "./Buttons";
import { DefaultInput } from "./Inputs";
import { InputsArr, Required } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { DefaultModal } from "../Modal/DefaultModal";
import { User } from "@/types";

export const RegisterationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const router = useRouter();

  const [successful, setSuccessful] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState("");

  const onSubmit: SubmitHandler<User> = (_: any) => {
    setSuccessful(true);
    setIsOpen(true);
    // setIsLoading(true);
    // console.log(data);
  };

  // const submitme = () => {
  //   const url = "https://owgtbam-default-rtdb.firebaseio.com/questions.json";
  //   const UserData = {
  //     questions: QuestionArr,
  //   };

  //   fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify(UserData),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("FireBase Successfully Connected Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <>
      <form className="mt-[24px] w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          {InputsArr.map((input, index) => (
            <Fragment key={index}>
              <DefaultInput
                label={input.label}
                label2={input.label2}
                Errorlabel={
                  errors[input.name] && <Required thisField={input.label} />
                }
                Icon={input.Icon}
                {...register(input.name, { required: true })}
              />
            </Fragment>
          ))}
          <div className="mt-6">
            <DefaultButton text="Register" />
          </div>
        </div>
      </form>
      {successful && (
        <DefaultModal
          closeAction={() => router.push("/registration")}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          Image={
            <div className="w-full max-w-[150px]">
              <Image
                fill
                alt="img"
                src="/Images/succestick.svg"
                className="cursor-not-allowed"
                draggable={false}
              />
            </div>
          }
          label="Registration successful!"
          Text={
            <div className="flex flex-col gap-6">
              <p className="text-center font-poppins text-base font-normal">
                You have successfully registered for this event, watch out for
                more updates
              </p>
            </div>
          }
          ButtonLabel="Done"
        />
      )}
    </>
  );
};
