"use client";
import { QuestionBox } from "@/components";
import { database } from "@/firebase";
import { isEqual } from "@/utils";
import { useQuestionStore } from "@/zustand/store";
import { DataSnapshot, off, onValue, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [showPlay, setShowPlay] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setShowPlay(true);
    }, 2000);
  }, []);

  const updateDataInStore = useQuestionStore(
    (state) => state.updateDataInStore
  );
  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );

  useEffect(() => {
    const dbRef = ref(database, "questionStore");

    const listener = (snapshot: DataSnapshot) => {
      const newData = snapshot.val();
      if (newData && !isEqual(newData, useQuestionStore.getState())) {
        updateDataInStore(newData);
      }
    };

    onValue(dbRef, listener);

    updateDataInFirebase({
      goToHome: false,
    });

    return () => {
      off(dbRef, "value", listener);
    };
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center purplebg ">
      <div className=" max-w-[150px] tablet:max-w-[250px] max-h-[150px] tablet:max-h-[250px] w-full h-full flex justify-center items-center mx-auto">
        <img
          src="/Images/logo2.svg"
          alt="Logo"
          className="max-w-[150px] tablet:max-w-[250px] max-h-[150px] tablet:max-h-[250px] w-full h-full"
        />
      </div>

      {showPlay && (
        <section
          onClick={() => router.push("/admin/challenge")}
          className=" mt-[6rem]"
        >
          <div className=" relative">
            <div className=" bg-[#EAB95A] w-[100px] h-[4.5px] z-[1] absolute left-[0%] top-[50%] translate-y-[-50%] " />
            <QuestionBox
              question="Lets Play!"
              className=" px-[12px] z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] tablet:text-4xl cursor-pointer"
              isBig={true}
            />
            <div className=" bg-[#EAB95A] w-[100px] h-[4.5px] z-[1] absolute right-[0%] top-[50%] translate-y-[-50%] " />
          </div>
        </section>
      )}
    </section>
  );
}
