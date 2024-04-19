"use client";
import { database } from "@/firebase";
import { useTestStore } from "@/zustand/store";
import { DataSnapshot, off, onValue, ref, set } from "firebase/database";
import React, { useEffect } from "react";

const page = () => {
  const value = useTestStore((state) => state.value);
  const increment = useTestStore((state) => state.increment);
  const decrement = useTestStore((state) => state.decrement);
  const setterdd = useTestStore((state) => state.setValue);

  useEffect(() => {
    const dbRef = ref(database, "randomStore");

    const listener = (snapshot: DataSnapshot) => {
      const newData = snapshot.val();
      if (newData) {
        console.log("New data from firbase", newData);

        setterdd(newData);
      }
    };

    onValue(dbRef, listener);

    return () => {
      off(dbRef, "value", listener);
    };
  }, []);

  const updateData = (newValue: number) => {
    const dbRef = ref(database, "randomStore");
    set(dbRef, newValue);
    console.log("Value from update function", newValue);
  };

  console.log("Value", value);

  return (
    <div className=" w-screen h-screen flex flex-col gap-8 justify-center items-center">
      <div className=" font-semibold text-4xl">{value}</div>

      <div className=" flex gap-8">
        <button
          onClick={() => {
            increment(5, updateData);
          }}
          className=" bg-red-500 p-4"
        >
          Increse
        </button>
        <button
          onClick={() => {
            decrement(2, updateData);
          }}
          className=" bg-red-500 p-4"
        >
          Decrese
        </button>
      </div>
    </div>
  );
};

export default page;
