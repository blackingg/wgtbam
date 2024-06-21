"use client";

import { Fragment, useState } from "react";
import { CustomizableBtn } from "./Buttons";
import { DefaultInput } from "./Inputs";
import { InputsArr, Required } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { AltModal } from "../Modal/DefaultModal";
import { finalUserData, User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { registerUser } from "@/server/actions";

export const RegisterationForm = ({ role }: { role: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const [regSuccessful, setRegSuccessful] = useState(false);

  const { mutateAsync, isPending, data, isSuccess } = useMutation({
    mutationFn: registerUser,
  });

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    setIsOpen(true);

    const newData: finalUserData = {
      name: data.sname,
      email: data.email,
      department: data.dept,
      faculty: data.faculty,
      phone: `${data.phoneNo}`,
      reg_type: role,
    };
    console.log(newData, "hekko");

    try {
      const response = await mutateAsync(newData);
      // console.log(response, "response");

      if (response.passed === true) {
        toast.dismiss();
        toast.success("Registration successful!");
        setRegSuccessful(true);
      } else {
        toast.dismiss();
        response.error.email
          ? toast.error(response.error.email)
          : toast.error("Failed to register");
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(`${error.message}`);
      console.error("An error occurred", error);
    }
  };

  return (
    <>
      <form className="mt-[24px] w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
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
          <div className="mt-4">
            <CustomizableBtn
              BtnContent={
                isPending ? (
                  <Image
                    width={30}
                    height={30}
                    alt="img"
                    src="/Images/loading-circle.svg"
                    className="h-full w-auto"
                    draggable={false}
                  />
                ) : (
                  "Register"
                )
              }
              disabled={isPending}
              className="h-[60px] disabled:bg-gray-500"
            />
          </div>
        </div>
      </form>
      {regSuccessful && (
        <AltModal
          closeAction={() => {
            router.refresh();
            setRegSuccessful(false);
          }}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          Image={
            <Image
              width={150}
              height={150}
              alt="img"
              src="/Images/succestick.svg"
              className="h-auto w-full max-w-[100px] lg:max-w-[150px]"
              draggable={false}
            />
          }
          label="Registration successful!"
          Text={
            <div className="flex flex-col gap-6">
              <p className="text-center font-poppins text-base font-normal">
                Thank you for registering for this event. Please check your
                email for more details and further instructions.
              </p>
            </div>
          }
          ButtonLabel="Done"
        />
      )}
    </>
  );
};
