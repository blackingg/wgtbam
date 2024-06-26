import { handleFiftyFifty } from "@/helpers";
import { State, useQuestionStore } from "@/zustand/store";

interface Options {
  a: string;
  b: string;
  c: string;
  d: string;
}

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

export const useFiftyClick = ({options, answer, updateDataInFirebase}:
  {options: Options | null, answer: string | null, updateDataInFirebase:  (data: Partial<State>) => Promise<void>}
 ) => {
  

  if (!options || !answer) return;

  const updatedOptions = handleFiftyFifty(options, answer);

  const newData: Partial<State> = {
    options: updatedOptions,
    usedFifty: true,
  };

  // updateDataInStore(newData);
  return newData
};