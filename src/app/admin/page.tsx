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
    (state) => state.updateDataInFirebase,
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
    <main className="relatve left-0 top-0 flex min-h-[100vh] w-screen flex-col justify-center gap-y-10 overflow-hidden">
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
