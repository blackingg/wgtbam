"use client";

import { RegAsWhat, RegisterationForm } from "@/components";
import Image from "next/image";
import { useState } from "react";

const RegistrationUser = () => {
  const [role, setRole] = useState("");
  const [isRole, setIsRole] = useState(false);

  return !isRole ? (
    <RegAsWhat
      role={role}
      setRole={setRole}
      isRole={isRole}
      setIsRole={setIsRole}
    />
  ) : (
    <div className="purplebg flex min-h-[100dvh] w-full items-center justify-center px-[5%] text-white">
      <div className="cscale-90 relative z-10 mt-[55px] flex w-full max-w-[550px] flex-col items-center justify-center rounded-3xl border border-white bg-opacity-[0.15] bg-gradient-to-br from-white/10 to-white/0 px-[15px] pb-[30px] pt-[55px] shadow-md backdrop-blur-sm tablet:px-[30px]">
        <div className="absolute left-[50%] top-[0%] z-[999] w-full max-w-[150px] translate-x-[-50%] translate-y-[-50%] tablet:max-w-[200px]">
          <Image
            src="/Images/logo.png"
            width={150}
            height={150}
            alt="Logo"
            className="h-auto w-[150px] tablet:w-[200px]"
          />
        </div>
        <h1 className="w-full font-montserrat text-2xl font-medium tablet:text-4xl">
          Welcome to
        </h1>
        <h2 className="w-full font-montserrat text-base font-medium tablet:text-xl">
          OAU Who Gets To Be A Millionare
        </h2>

        <p className="w-full font-poppins text-sm font-normal text-white/90 tablet:text-base">
          Register Now! And stand a chance to be a millionaire!!!!
        </p>

        <RegisterationForm role={role} />
      </div>
    </div>
  );
};

export default RegistrationUser;
