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
    (state) => state.updateDataInFirebase,
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
    <main className="relatve left-0 top-0 flex min-h-[100vh] w-screen flex-col items-center justify-center gap-y-10 overflow-hidden">
      <BackgroundImage />
      <MillionareLogo
        width={350}
        height={350}
        className="max-w-[240px] tablet:max-w-[360px] max-h-[240px] tablet:max-h-[360px]"
      />
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
