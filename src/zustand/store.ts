"use client"
import { database } from "@/firebase";
import { Question } from "@/types";
import { QuestionArr } from "@/utils";
import { ref, set as FirebaseSet, set } from 'firebase/database';
import { create } from "zustand";

export type State = {
  allQuestions: Question[];
  currentChallengeIndex: number;
  usedFifty: boolean;
  usedPhone: boolean;
  usedAudience: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  prizeLevel: number;
  selectedAnswer: string | null;
  openPrize: boolean;
  isConfirmed: boolean;
  finallyIsCorrectAns: boolean;
  finallyUserLevel: number;
  revealCorrectAnswer: boolean;
  showRevealCorrect: string;
  goToNextQuestion: boolean;
  goToHome: boolean;
  showCheckpoint: boolean;
}

export type Action = {
  setQuestionArr: (allQuestions: Question[], callback?: (allQuestions: Question[]) => void) => void;
  setAllQuestions: (updatedOptions: (string | undefined)[], challengeIndex: number, callback?: (updatedQuestions: Question[]) => void) => void;
  setCurrentChallengeIndex: (index: number, callback?: (index: number) => void) => void;
  setUsedFifty: (used: boolean, callback?: (used: boolean) => void) => void;
  setUsedPhone: (used: boolean, callback?: (used: boolean) => void) => void;
  setUsedAudience: (used: boolean, callback?: (used: boolean) => void) => void;
  setIsAnswered: (answered: boolean, callback?: (answered: boolean) => void) => void;
  setIsCorrect: (correct: boolean, callback?: (correct: boolean) => void) => void;
  setPrizeLevel: (level: number, callback?: (level: number) => void) => void;
  setSelectedAnswer: (answer: string | null, callback?: (answer: string | null) => void) => void;
  setOpenPrize: (open: boolean, callback?: (open: boolean) => void) => void;
  setIsConfirmed: (confirmed: boolean, callback?: (confirmed: boolean) => void) => void;
  setFinallyIsCorrectAns: (correct: boolean, callback?: (correct: boolean) => void) => void;
  setFinallyUserLevel: (level: number, callback?: (level: number) => void) => void;
  setRevealCorrectAnswer: (reveal: boolean, callback?: (reveal: boolean) => void) => void;
  setShowRevealCorrect: (reveal: string, callback?: (reveal: string) => void) => void;
  setGoToNextQuestion: (next: boolean, callback?: (next: boolean) => void) => void;
  updateDataInFirebase: (data: Partial<State>) => void;
  updateDataInStore: (data: Partial<State>) => void;
  setGoToHome: (home: boolean, callback?: (home: boolean) => void) => void;
  setShowCheckpoint: (show: boolean, callback?: (show: boolean) => void) => void;
};



export const useQuestionStore = create<State & Action>()((set, get) => ({
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
  goToHome: false,
  showCheckpoint: false,
  setShowCheckpoint: (show, callback) => set(() => {
    callback && callback(show);
    return { showCheckpoint: show };
  }),
  setGoToHome: (boolValue, callback) => set(() => {
    callback && callback(boolValue);
    return { goToHome: boolValue };
  }),
  setQuestionArr: (allQuest, callback) => set((state) => {
    const newQuestionsArr = allQuest;
    callback && callback(newQuestionsArr);
    return { allQuestions: newQuestionsArr };
  }),
  setAllQuestions: (updatedOptions, challengeIndex, callback) => set((state) => {
    const updatedQuestions = [...state.allQuestions];
    updatedQuestions[challengeIndex] = {
      ...state.allQuestions[challengeIndex],
      option1: updatedOptions[0] || "",
      option2: updatedOptions[1] || "",
      option3: updatedOptions[2] || "",
      option4: updatedOptions[3] || "",
    };
    callback && callback(updatedQuestions);
    return { allQuestions: updatedQuestions };
  }),

  setCurrentChallengeIndex: (index, callback) => set((state) => {
    const newIndex = state.currentChallengeIndex + index;
    callback && callback(newIndex);
    return { currentChallengeIndex: newIndex };
  }),

  setUsedFifty: (used, callback) => set((state) => {
    callback && callback(used);
    return { usedFifty: used };
  }),

  setUsedPhone: (used, callback) => set((state) => {
    callback && callback(used);
    return { usedPhone: used };
  }),

  setUsedAudience: (used, callback) => set((state) => {
    callback && callback(used);
    return { usedAudience: used };
  }),

  setIsAnswered: (answered, callback) => set((state) => {
    callback && callback(answered);
    return { isAnswered: answered };
  }),

  setIsCorrect: (correct, callback) => set((state) => {
    callback && callback(correct);
    return { isCorrect: correct };
  }),

  setPrizeLevel: (level, callback) => set((state) => {
    callback && callback(level);
    return { prizeLevel: level };
  }),

  setSelectedAnswer: (answer, callback) => set((state) => {
    callback && callback(answer);
    return { selectedAnswer: answer };
  }),

  setOpenPrize: (open, callback) => set((state) => {
    callback && callback(open);
    return { openPrize: open };
  }),

  setIsConfirmed: (confirmed, callback) => set((state) => {
    callback && callback(confirmed);
    return { isConfirmed: confirmed };
  }),

  setFinallyIsCorrectAns: (correct, callback) => set((state) => {
    callback && callback(correct);
    return { finallyIsCorrectAns: correct };
  }),

  setFinallyUserLevel: (level, callback) => set((state) => {
    callback && callback(level);
    return { finallyUserLevel: level };
  }),

  setRevealCorrectAnswer: (reveal, callback) => set((state) => {
    callback && callback(reveal);
    return { revealCorrectAnswer: reveal };
  }),

  setShowRevealCorrect: (reveal, callback) => set((state) => {
    callback && callback(reveal);
    return { showRevealCorrect: reveal };
  }),

  setGoToNextQuestion: (next, callback) => set((state) => {
    callback && callback(next);
    return { goToNextQuestion: next };
  }),
   updateDataInFirebase: (data) => {
  const dbRef = ref(database, "questionStore");

  const currentState = get();

  const newData = { ...currentState, ...data };
  // console.log("From zustand", newData);
  

  const { 
  setAllQuestions, 
  setCurrentChallengeIndex, 
  setUsedFifty, 
  setUsedPhone, 
  setUsedAudience, 
  setIsAnswered, 
  setIsCorrect, 
  setPrizeLevel, 
  setSelectedAnswer, 
  setOpenPrize, 
  setIsConfirmed, 
  setFinallyIsCorrectAns, 
  setFinallyUserLevel, 
  setRevealCorrectAnswer, 
  setShowRevealCorrect, 
  setGoToNextQuestion,
  setQuestionArr, 
  updateDataInFirebase,
  updateDataInStore,
  setGoToHome,
  setShowCheckpoint,
  ...stateToSave 
} = newData;

// console.log("State to save??", stateToSave);

  set(stateToSave);

  FirebaseSet(dbRef, stateToSave); 
},
   updateDataInStore: (data) => {
  const currentState = get();

  const newData = { ...currentState, ...data };
  // console.log("Update in store", newData);
  

  const { 
  setAllQuestions, 
  setCurrentChallengeIndex, 
  setUsedFifty, 
  setUsedPhone, 
  setUsedAudience, 
  setIsAnswered, 
  setIsCorrect, 
  setPrizeLevel, 
  setSelectedAnswer, 
  setOpenPrize, 
  setIsConfirmed, 
  setFinallyIsCorrectAns, 
  setFinallyUserLevel, 
  setRevealCorrectAnswer, 
  setShowRevealCorrect, 
  setGoToNextQuestion,
  setQuestionArr, 
  updateDataInFirebase,
  setGoToHome,
  setShowCheckpoint,
  ...stateToSave 
} = newData;

// console.log("Updated store data", stateToSave);

  set(stateToSave);
},
}));


