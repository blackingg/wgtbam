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

  return (
    <main className="relatve w-screen min-h-screen flex flex-col gap-y-10 justify-center">
      <BackgroundImage />
      <MillionareLogo />
      <ClickableMillionareBox
        text="Lets Play!"
        onClick={async () => {
          console.log("herere");

          await updateDataInFirebase({
            letsPlay: true,
          });
        }}
      />
    </main>
  );
}
