"use client";
import { ConfirmationBtn, QuestionBox } from "@/components";
import { QuestionArr, isEqual, values } from "@/utils";
import { useQuestionStore } from "@/zustand/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { DataSnapshot, off, onValue, ref, set } from "firebase/database";
import { database } from "@/firebase";

export default function Home({
  searchParams,
}: {
  searchParams: { prizeLevel: string };
}) {
  const numPrizeLevel = parseInt(searchParams.prizeLevel, 10);

  function getAmount(value: number) {
    for (let i = 0; i < values.length; i++) {
      if (values[i].value === value) {
        return values[i].amount;
      }
    }
    return null; // Return null if no matching value is found
  }

  const [pieces, setPieces] = useState(200);

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 3000);
  };

  const [isClient, setIsClient] = useState(false);

  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );

  const setGoToHome = useQuestionStore((state) => state.setGoToHome);
  const updateDataInStore = useQuestionStore(
    (state) => state.updateDataInStore
  );

  useEffect(() => {
    setIsClient(true);
    stopConfetti();
  }, []);

  useEffect(() => {
    const dbRef = ref(database, "questionStore");

    const listener = (snapshot: DataSnapshot) => {
      const newData = snapshot.val();
      if (newData && !isEqual(newData, useQuestionStore.getState())) {
        updateDataInStore(newData);
      }
    };

    onValue(dbRef, listener);

    return () => {
      off(dbRef, "value", listener);
    };
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center purplebg">
      {isClient && (
        <Confetti
          gravity={0.2}
          numberOfPieces={pieces}
          className="lConfetti w-screen h-screen grid place-items-center mx-auto"
        />
      )}
      <div className=" max-w-[150px] tablet:max-w-[250px] max-h-[150px] tablet:max-h-[250px] w-full h-full flex justify-center items-center mx-auto">
        <img
          src="/Images/logo2.svg"
          alt="Logo"
          className="max-w-[350px] max-h-[350px] w-full h-full"
        />
      </div>

      <h1 className=" mt-[3rem] tablet:mt-[6rem] font-montserrat font-medium text-xl tablet:text-3xl ipad:text-5xl text-white/90 text-center">
        Total prize money won
      </h1>
      <section className="">
        <div className=" mt-[2.5rem] tablet:mt-[4.5rem] relative">
          <div className=" bg-[#EAB95A] w-[100px] h-[4.5px] z-[1] absolute left-[0%] top-[50%] translate-y-[-50%] " />
          <QuestionBox
            question={`${
              getAmount(numPrizeLevel) ? getAmount(numPrizeLevel) : "₦0"
            }`}
            className=" px-[12px] z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] tablet:text-3xl ipad:text-5xl"
          />
          <div className=" bg-[#EAB95A] w-[100px] h-[4.5px] z-[1] absolute right-[0%] top-[50%] translate-y-[-50%] " />
        </div>
      </section>
      <div className=" flex justify-center items-center w-full mt-20">
        <Link
          href="/admin"
          onClick={() => {
            console.log("Clicked");
            updateDataInFirebase({
              allQuestions: QuestionArr,
              currentChallengeIndex: 0,
              usedFifty: false,
              usedPhone: false,
              usedAudience: false,
              isAnswered: false,
              isCorrect: false,
              prizeLevel: 0,
              selectedAnswer: null,
              openPrize: false,
              isConfirmed: false,
              finallyIsCorrectAns: false,
              finallyUserLevel: 0,
              revealCorrectAnswer: false,
              showRevealCorrect: "",
              goToNextQuestion: false,
              goToHome: true,
            });
          }}
        >
          <ConfirmationBtn
            btntext="Reset Quiz"
            className=" bg-[#FFFFFF] text-[#8A0089]"
          />
        </Link>
      </div>
    </section>
  );
}
