"use client";

import { DefaultButton } from "./Buttons";
import ReactDOM from "react-dom";

const handleRegAs = async () => {
  // "use server";
  //  const { participant } = req.body;
  //  if (participant) {
  //    return "Participant";
};

export const RegAsWhat = ({
  role,
  setRole,
  isRole,
  setIsRole,
}: {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  isRole: boolean;
  setIsRole: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  return ReactDOM.createPortal(
    <div className="purplebg fixed left-0 top-0 z-[999999] flex h-[100vh] w-screen items-center justify-center bg-black/50 px-[5%] backdrop-blur-sm">
      <form
        className="relative z-[99999] mt-[24px] flex w-full max-w-[500px] flex-col items-center justify-center py-8 lg:rounded-3xl lg:border lg:border-white lg:bg-opacity-[0.15] lg:bg-gradient-to-br lg:from-white/10 lg:to-white/0 lg:px-5 lg:shadow-md lg:backdrop-blur-sm"
        action={handleRegAs}
      >
        <div className="flex w-full flex-col gap-3 text-white">
          <h2 className="w-full font-montserrat text-2xl font-semibold tablet:text-xl">
            Resgistration
          </h2>

          <p className="w-full font-poppins text-base font-normal text-white/90 tablet:text-base">
            Register as either a participant or an attendee
          </p>
          <div className="relative flex h-[50px] items-center justify-end overflow-hidden rounded-lg border-[1.5px] border-white/80 bg-white/20 px-4 font-poppins text-base font-normal text-white/90 shadow-md backdrop-blur-sm">
            <label
              htmlFor="input"
              className="absolute left-[16px] top-[50%] z-50 translate-y-[-50%] font-poppins text-sm font-normal"
            >
              Participant
            </label>
            <input
              type="radio"
              id="participant"
              name="participant"
              value="participant"
              checked={role === "participant"}
              onChange={handleChange}
              className="h-[24px] w-[24px] rounded-lg bg-white/10 pl-[16px] placeholder:font-poppins placeholder:text-white/50"
            />
          </div>
          <div className="relative flex h-[50px] items-center justify-end overflow-hidden rounded-lg border-[1.5px] border-white/80 bg-white/20 px-4 font-poppins text-base font-normal text-white/90 shadow-md backdrop-blur-sm">
            <label
              htmlFor="input"
              className="absolute left-[16px] top-[50%] z-50 translate-y-[-50%] font-poppins text-sm font-normal"
            >
              Attendee
            </label>
            <input
              type="radio"
              id="attendee"
              name="attendee"
              value="attendee"
              checked={role === "attendee"}
              onChange={handleChange}
              className="h-[24px] w-[24px] rounded-lg bg-white/10 pl-[16px] placeholder:font-poppins placeholder:text-white/50"
            />
          </div>
          <div className="mt-6">
            <DefaultButton
              text="Complete Registration"
              onClick={() => setIsRole(true)}
            />
          </div>
        </div>
      </form>
    </div>,
    document.body,
  );
};
