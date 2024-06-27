"use client";

import { useIsClient } from "@/utils";
import {
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { RingLoader } from "../Loader";

const AUTH_TOKEN_KEY = "authToken";
const AUTH_TOKEN_VALUE = "admin0987";

export const ProtectedWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token === AUTH_TOKEN_VALUE) {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated ? (
    <div>{children}</div>
  ) : (
    <AuthModal setIsAuthenticated={setIsAuthenticated} />
  );
};

interface AuthModalProps {
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
}

const AuthModal: FC<AuthModalProps> = ({ setIsAuthenticated }) => {
  const [inpVal, setInpVal] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inpVal === AUTH_TOKEN_VALUE) {
      localStorage.setItem(AUTH_TOKEN_KEY, AUTH_TOKEN_VALUE);
      setIsAuthenticated(true);
    }

    // console.log("hehe", inpVal);
  };

  const isClient = useIsClient();

  return isClient ? (
    ReactDOM.createPortal(
      <div className="purplebg fixed left-0 top-0 z-[9999999999] flex h-screen w-screen items-center justify-center px-[5%] text-white backdrop-blur-md">
        <div className="flex w-full max-w-[550px] flex-col items-center justify-center rounded-3xl border border-white bg-opacity-[0.15] bg-gradient-to-br from-white/10 to-white/0 px-5 pb-[30px] pt-[55px] shadow-md backdrop-blur-sm tablet:px-[30px]">
          <form
            className="w-full space-y-6 font-poppins text-sm font-normal text-white/90 lg:text-base"
            onSubmit={handleSubmit}
          >
            <label htmlFor="authmodalinput">Enter Authorization Token</label>
            <div className="relative mt-1">
              <input
                type="password"
                id="authmodalinput"
                className="input-glassl input-gradientl h-[45px] w-full rounded-lg border-[1px] border-white/80 bg-white/10 pl-[16px] shadow-md backdrop-blur-sm placeholder:font-poppins placeholder:text-white/50 lg:h-[45px]"
                placeholder="Enter token"
                value={inpVal}
                onChange={(e) => setInpVal(e.target.value)}
              />
            </div>

            <button className="w-full rounded-md bg-[#8A0089] py-3 text-white">
              Confirm
            </button>
          </form>
        </div>
      </div>,
      document.body,
    )
  ) : (
    <RingLoader />
  );
};
