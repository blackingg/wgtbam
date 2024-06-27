"use client";
import { database } from "@/firebase";
import axios from "axios";
//@ts-ignore
import { ref, set as FirebaseSet, set } from "firebase/database";
import { toast } from "react-toastify";
import { create } from "zustand";

interface Options {
  a: string;
  b: string;
  c: string;
  d: string;
}

// Define the shape of the main data
interface QuestionData {
  answer: string;
  difficulty_level: string;
  id: number;
  options: Options;
  // qid: string;
  // qtype: string;
  question: string;
  // status: string;
}

export type State = {
  answer: string | null;
  difficulty_level: string | null;
  id: number | null;
  options: Options | null;
  question: string | null;
  usedFifty: boolean;
  usedPhone: boolean;
  usedAudience: boolean;
  isAnswered: boolean;
  goToHome: boolean;
  showCheckpoint: boolean;
  letsPlay: boolean;
  goToTotal: boolean;
  continueChallenge: boolean;
  prizeLevel: number;
  openPrize: boolean;
  revealCorrectAnswer: boolean;
  isConfirmed: boolean;
  finallyIsCorrectAns: boolean;
  finallyUserLevel: number;
  showRevealCorrect: string;
  selectedAnswer: string;
  isCorrect: boolean;
  clearStorage: boolean;
  showPhoneTimer: boolean;
};

export type Action = {
  getQuestionsFromServer: () => Promise<void>;

  setUsedFifty: (value: boolean) => void;
  setUsedPhone: (value: boolean) => void;
  setUsedAudience: (value: boolean) => void;
  setIsAnswered: (value: boolean) => void;
  setGoToHome: (value: boolean) => void;
  setShowCheckpoint: (value: boolean) => void;
  setLetsPlay: (value: boolean) => void;
  setGoToTotal: (value: boolean) => void;
  setContinueChallenge: (value: boolean) => void;
  setPrizeLevel: (value: number) => void;
  setOpenPrize: (value: boolean) => void;
  setRevealCorrectAnswer: (reveal: boolean) => void;
  setSelectedAnswer: (answer: string) => void;
  setFinallyIsCorrectAns: (correct: boolean) => void;
  setFinallyUserLevel: (level: number) => void;
  setShowRevealCorrect: (reveal: string) => void;
  setIsConfirmed: (confirmed: boolean) => void;
  setIsCorrect: (correct: boolean) => void;
  setClearStorage: (clear: boolean) => void;
  setShowPhoneTimer: (show: boolean) => void;

  updateDataInFirebase: (data: Partial<State>) => Promise<void>;
  updateDataInStore: (data: Partial<State>) => void;
};

export const useQuestionStore = create<State & Action>()((set, get) => ({
  answer: null,
  difficulty_level: null,
  id: null,
  options: null,
  question: null,
  usedFifty: false,
  usedPhone: false,
  usedAudience: false,
  isAnswered: false,
  goToHome: false,
  showCheckpoint: false,
  letsPlay: false,
  goToTotal: false,
  continueChallenge: false,
  prizeLevel: 0,
  openPrize: false,
  revealCorrectAnswer: false,
  isConfirmed: false,
  finallyIsCorrectAns: false,
  finallyUserLevel: 0,
  showRevealCorrect: "",
  selectedAnswer: "",
  isCorrect: false,
  clearStorage: false,
   showPhoneTimer: false,

  getQuestionsFromServer: async () => {
    return new Promise(async (resolve, reject) => {
      try {
         const prizeLevel = get().prizeLevel;

        const response = await axios.post(
          "https://oneklass2.oauife.edu.ng/api/wgtbam/fetchquestion",
          {
            fetchpair: {
              // qtype: "currentaffairs",
              // difficulty_level: "3",
              difficulty_level: prizeLevel < 5 ? "2" : "3",
            },
            adminpass: "admin0987",
          },
        );
        // console.log("questions", response.data);

        const questionData = {
          answer: response.data.queryset[0].answer,
          difficulty_level: response.data.queryset[0].difficulty_level,
          id: response.data.queryset[0].id,
          options: response.data.queryset[0].options,
          question: response.data.queryset[0].question,
        }

        set({
          answer: response.data.queryset[0].answer,
          difficulty_level: response.data.queryset[0].difficulty_level,
          id: response.data.queryset[0].id,
          options: response.data.queryset[0].options,
          question: response.data.queryset[0].question,
        });

        try {
        const dbRef = ref(database, "questionStore");
        const currentState = get();
        const newData = { ...currentState, ...questionData };

        const {
          setUsedFifty,
          setUsedPhone,
          setUsedAudience,
          setIsAnswered,
          setGoToHome,
          setShowCheckpoint,
          setLetsPlay,
          setGoToTotal,
          setContinueChallenge,
          getQuestionsFromServer,
          updateDataInFirebase,
          updateDataInStore,
          setOpenPrize,
          setPrizeLevel,
          setFinallyIsCorrectAns,
          setFinallyUserLevel,
          setIsConfirmed,
          setIsCorrect,
          setRevealCorrectAnswer,
          setSelectedAnswer,
          setShowRevealCorrect,
          setClearStorage,
          setShowPhoneTimer,
          ...stateToSave
        } = newData;

        set(stateToSave);

        FirebaseSet(dbRef, stateToSave)
          .then(() => resolve())
          .catch((error: any) => reject(error));
      } catch (error) {
        // console.log("firebase error, ", error);
        
        reject(error);
      }

        resolve();
      } catch (error) {
        // console.log("error", error);
        toast.error("Failed to fetch questions");
        reject(error);
      }
    });
  },

  setUsedFifty: (value) => set({ usedFifty: value }),
  setUsedPhone: (value) => set({ usedPhone: value }),
  setUsedAudience: (value) => set({ usedAudience: value }),
  setIsAnswered: (value) => set({ isAnswered: value }),
  setGoToHome: (value) => set({ goToHome: value }),
  setShowCheckpoint: (value) => set({ showCheckpoint: value }),
  setLetsPlay: (value) => set({ letsPlay: value }),
  setGoToTotal: (value) => set({ goToTotal: value }),
  setContinueChallenge: (value) => set({ continueChallenge: value }),
  setPrizeLevel: (value) => set({ prizeLevel: value }),
  setOpenPrize: (value) => set({ openPrize: value }),
  setRevealCorrectAnswer: (reveal) => set({ revealCorrectAnswer: reveal }),
  setIsConfirmed: (confirmed) => set({ isConfirmed: confirmed }),
  setFinallyIsCorrectAns: (correct) => set({ finallyIsCorrectAns: correct }),
  setFinallyUserLevel: (level) => set({ finallyUserLevel: level }),
  setSelectedAnswer: (answer) => set({ selectedAnswer: answer }),
  setShowRevealCorrect: (reveal) => set({ showRevealCorrect: reveal }),
  setIsCorrect: (correct) => set({ isCorrect: correct }),
  setClearStorage: (clear) => set({ clearStorage: clear }),
  setShowPhoneTimer: (show) => set({ showPhoneTimer: show }),

  updateDataInFirebase: async (data) => {
    return new Promise((resolve, reject) => {
      try {
        const dbRef = ref(database, "questionStore");
        const currentState = get();
        const newData = { ...currentState, ...data };

        const {
          setUsedFifty,
          setUsedPhone,
          setUsedAudience,
          setIsAnswered,
          setGoToHome,
          setShowCheckpoint,
          setLetsPlay,
          setGoToTotal,
          setContinueChallenge,
          getQuestionsFromServer,
          updateDataInFirebase,
          updateDataInStore,
          setOpenPrize,
          setPrizeLevel,
          setFinallyIsCorrectAns,
          setFinallyUserLevel,
          setIsConfirmed,
          setIsCorrect,
          setRevealCorrectAnswer,
          setSelectedAnswer,
          setShowRevealCorrect,
          setClearStorage,
          setShowPhoneTimer,
          ...stateToSave
        } = newData;

        set(stateToSave);

        FirebaseSet(dbRef, stateToSave)
          .then(() => resolve())
          .catch((error: any) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  },
  updateDataInStore: (data) => {
    const currentState = get();
    const newData = { ...currentState, ...data };

    const {
      setUsedFifty,
      setUsedPhone,
      setUsedAudience,
      setIsAnswered,
      setGoToHome,
      setShowCheckpoint,
      setLetsPlay,
      setGoToTotal,
      setContinueChallenge,
      getQuestionsFromServer,
      updateDataInFirebase,
      updateDataInStore,
      setOpenPrize,
      setPrizeLevel,
      setFinallyIsCorrectAns,
      setFinallyUserLevel,
      setIsConfirmed,
      setIsCorrect,
      setRevealCorrectAnswer,
      setSelectedAnswer,
      setShowRevealCorrect,
      setClearStorage,
      setShowPhoneTimer,
      ...stateToSave
    } = newData;

    set(stateToSave);
  },
}));
