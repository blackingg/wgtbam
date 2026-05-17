"use client";
import { database } from "@/firebase";
import { fetchQuestion } from "@/server/actions";
import { ref, set as FirebaseSet } from "firebase/database";
import { toast } from "react-toastify";
import { create } from "zustand";

interface Options {
  a: string;
  b: string;
  c: string;
  d: string;
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
  // Tracks question IDs used in the current game — resets on Reset Quiz
  usedQuestionIds: number[];
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

// Strip action functions before saving to Firebase
const stripActions = (state: State & Action): State => {
  const {
    getQuestionsFromServer,
    updateDataInFirebase,
    updateDataInStore,
    setUsedFifty,
    setUsedPhone,
    setUsedAudience,
    setIsAnswered,
    setGoToHome,
    setShowCheckpoint,
    setLetsPlay,
    setGoToTotal,
    setContinueChallenge,
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
    ...stateOnly
  } = state;
  return stateOnly;
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
  usedQuestionIds: [],

  // ─── Fetch a question from Supabase then push full state to Firebase ──────
  getQuestionsFromServer: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const prizeLevel = get().prizeLevel;
        const usedQuestionIds = get().usedQuestionIds;
        const difficulty_level = prizeLevel < 5 ? 2 : 3;

        const { data: question, error } = await fetchQuestion(
          difficulty_level,
          usedQuestionIds
        );

        if (error || !question) {
          toast.error("Failed to fetch question");
          reject(new Error(error ?? "No question returned"));
          return;
        }

        const questionData = {
          answer: question.answer,
          difficulty_level: question.difficulty_level,
          id: question.id,
          options: question.options,
          question: question.question,
          // Add this question's ID to the used list
          usedQuestionIds: [...usedQuestionIds, question.id],
        };

        set(questionData);

        // Push the updated full state to Firebase so the player screen syncs
        const dbRef = ref(database, "questionStore");
        const stateToSave = stripActions({ ...get() } as State & Action);

        FirebaseSet(dbRef, { ...stateToSave, ...questionData })
          .then(() => resolve())
          .catch((err) => reject(err));
      } catch (error) {
        toast.error("Failed to fetch question");
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

  // ─── Write a partial state update to both Zustand and Firebase ────────────
  updateDataInFirebase: async (data) => {
    return new Promise((resolve, reject) => {
      try {
        const currentState = get();
        const merged = { ...currentState, ...data };
        set(data);

        const dbRef = ref(database, "questionStore");
        const stateToSave = stripActions(merged as State & Action);

        FirebaseSet(dbRef, stateToSave)
          .then(() => resolve())
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  },

  // ─── Update Zustand only (no Firebase write) ──────────────────────────────
  updateDataInStore: (data) => {
    set(data);
  },
}));
