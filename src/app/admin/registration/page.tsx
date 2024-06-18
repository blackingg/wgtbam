"use client";
import { DefaultButton, DefaultInput, DefaultModal } from "@/components";
import { useRouter } from "next/navigation";
import { InputsArr, Required } from "@/utils";
import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "@/types";
import Image from "next/image";

const RegisterationAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const router = useRouter();

  const [successful, setSuccessful] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit: SubmitHandler<User> = (_: any) => {
    // setIsLoading(true);
    setSuccessful(true);
    setIsOpen(true);
    // console.log(data);
  };

  const [isClient, setIsClient] = useState(false);

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

  useEffect(() => {
    setIsClient(true);
    // submitme();
  }, []);

  return (
    isClient && (
      <div className="purplebg flex min-h-[100dvh] items-center justify-center px-[20px] pb-[25px] text-white">
        <div className="relative z-10 mt-[80px] flex w-full max-w-[558px] flex-col items-center justify-center rounded-3xl border border-white bg-opacity-[0.15] bg-gradient-to-br from-white/10 to-white/0 px-[15px] pb-[30px] pt-[55px] shadow-md backdrop-blur-sm tablet:px-[30px]">
          <div className="absolute left-[50%] top-[0%] w-full max-w-[150px] translate-x-[-50%] translate-y-[-50%] tablet:max-w-[200px]">
            <Image src="/Images/logo.png" fill alt="Logo" className="" />
          </div>
          <h1 className="w-full font-montserrat text-2xl font-medium tablet:text-4xl">
            Welcome to
          </h1>
          <h2 className="w-full font-montserrat text-base font-medium tablet:text-xl">
            OAU Who Gets To Be A Millionare
          </h2>

          <p className="w-full font-poppins text-sm font-normal text-opacity-90 tablet:text-base">
            Register Now! And stand a chance to be a millionaire!!!!
          </p>

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
        </div>
        {successful && isClient && (
          <DefaultModal
            closeAction={() => router.push("/registration")}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            Image={
              <div className="w-full max-w-[150px]">
                <Image
                  src="/Images/succestick.svg"
                  className="cursor-not-allowed"
                  draggable={false}
                  alt="Success Icon"
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
      </div>
    )
  );
};

export default RegisterationAdmin;
