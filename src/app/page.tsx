"use client";

import {
  BackgroundImage,
  MillionareLogo,
  ClickableMillionareBox,
} from "@/components";
import { useFirebaseListener } from "@/hooks";
import { useQuestionStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";

export default function Home() {
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );
  const checkLetsPlay = useQuestionStore((state) => state.letsPlay);
  const router = useRouter();

  useEffect(() => {
    checkLetsPlay === true && router.push("/challenge");
  }, [checkLetsPlay]);

  useFirebaseListener();

  if (checkLetsPlay === true) {
    return <Loading />;
  }

  return (
    <main className="relatve top-0 left-0 overflow-hidden w-screen min-h-screen flex flex-col gap-y-10 justify-center items-center">
      <BackgroundImage />
      <MillionareLogo />
      <ClickableMillionareBox
        text="Lets Play!"
        onClick={async () => {
          await updateDataInFirebase({
            letsPlay: true,
          });
        }}
      />
    </main>
  );
}
