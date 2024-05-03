"use client";
import {
  BackgroundImage,
  ClickableMillionareBox,
  MillionareBtn,
  MillionareLogo,
  QuestionBox,
} from "@/components";
import { database } from "@/firebase";
import { useCreateQueryString } from "@/hooks";
import { isEqual, values } from "@/utils";
import { useQuestionStore } from "@/zustand/store";
import { DataSnapshot, off, onValue, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = ({ searchParams }: { searchParams: { prizeLevel: string } }) => {
  const numPrizeLevel = parseInt(searchParams.prizeLevel, 10);
  //   console.log("searchParams", searchParams);

  const router = useRouter();

  const goToHome = useQuestionStore((state) => state.goToHome);
  const setGoToHome = useQuestionStore((state) => state.setGoToHome);
  const updateDataInStore = useQuestionStore(
    (state) => state.updateDataInStore
  );

  useEffect(() => {
    const dbRef = ref(database, "questionStore");

    const listener = (snapshot: DataSnapshot) => {
      const newData = snapshot.val();
      if (newData && !isEqual(newData, useQuestionStore.getState())) {
        updateDataInStore(newData);
        console.log("Go to home in UE", newData.goToHome);

        // setGoToHome(newData.goToHome);
      }
    };

    onValue(dbRef, listener);

    return () => {
      off(dbRef, "value", listener);
    };
  }, []);

  function GoToQuestion() {
    router.push("/admin/challenge");
  }

  const createQueryString = useCreateQueryString();

  function WithdrawMoney() {
    router.push(
      "/admin/total" + "?" + createQueryString("prizeLevel", `${numPrizeLevel}`)
    );
  }

  return (
    <main className="relatve w-screen min-h-screen flex flex-col gap-y-10 justify-center ">
      <BackgroundImage />

      <MillionareLogo />

      <h1 className=" font-montserrat font-semibold text-xl tablet:text-3xl ipad:text-[40px] text-white/90 text-center">
        Checkpoint Confirmation
      </h1>
      <section className="w-full flex flex-col items-center gap-10">
        <ClickableMillionareBox
          text="Withdraw Prize Money"
          onClick={WithdrawMoney}
        />
        <ClickableMillionareBox
          text="Continue Playing"
          onClick={GoToQuestion}
        />
      </section>
    </main>
  );
};

export default page;
