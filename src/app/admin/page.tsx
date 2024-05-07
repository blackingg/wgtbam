"use client";

import {
  BackgroundImage,
  ClickableMillionareBox,
  MillionareLogo,
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
  const goToHome = useQuestionStore((state) => state.goToHome);
  const checkLetsPlay = useQuestionStore((state) => state.letsPlay);
  const router = useRouter();

  useEffect(() => {
    checkLetsPlay === true && router.push("/admin/challenge");

    const Run = async () => {
      goToHome === true && (await updateDataInFirebase({ goToHome: false }));
    };
    Run();
  }, [checkLetsPlay, goToHome]);

  useFirebaseListener();

  if (checkLetsPlay === true) {
    return <Loading />;
  }

  return (
    <main className="top-0 left-0 overflow-hidden relatve w-screen min-h-screen flex flex-col gap-y-10 justify-center">
      <BackgroundImage />
      <MillionareLogo />
      <ClickableMillionareBox
        text="Lets Play!"
        onClick={async () => {
          router.push("/admin/challenge/");
          await updateDataInFirebase({
            letsPlay: true,
          });
        }}
      />
    </main>
  );
}
