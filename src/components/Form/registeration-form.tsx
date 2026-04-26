"use client";
import { DefaultButton, DefaultInput } from "@/components";
import { registerUser } from "@/server/actions";
import { finalUserData } from "@/types";
import { InputsArr, Required } from "@/utils";
import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { User } from "@/types";

export const RegisterationForm = ({ role }: { role: string }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data) => {
    setLoading(true);
    try {
      const payload: finalUserData = {
        name: data.sname,
        email: data.email,
        faculty: data.faculty,
        department: data.dept,
        phone: String(data.phoneNo),
        reg_type: role,
      };

      const { passed, error } = await registerUser(payload);

      if (!passed && error) {
        Object.entries(error).forEach(([field, msg]) => {
          if (field === "email") {
            setError("email", { message: msg });
          } else {
            toast.error(msg);
          }
        });
        return;
      }

      setSuccess(true);
      reset();
      toast.success("Registration successful!");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        <div className="text-5xl">🎉</div>
        <h2 className="font-montserrat text-xl font-bold">You're registered!</h2>
        <p className="text-white/70 text-sm">Good luck at the event.</p>
      </div>
    );
  }

  return (
    <form className="mt-[24px] w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        {InputsArr.map((input, index) => (
          <Fragment key={index}>
            <DefaultInput
              label={input.label}
              label2={input.label2}
              Errorlabel={
                errors[input.name] && (
                  <Required thisField={errors[input.name]?.message ?? input.label} />
                )
              }
              Icon={input.Icon}
              {...register(input.name, { required: true })}
            />
          </Fragment>
        ))}
        <div className="mt-6">
          <DefaultButton text={loading ? "Registering..." : "Register"} disabled={loading} />
        </div>
      </div>
    </form>
  );
};
