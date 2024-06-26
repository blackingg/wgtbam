import { useQuestionStore } from '@/zustand/store';

export const AllUsedStateGetter = () => {
 
  const usedFifty = useQuestionStore((state) => state.usedFifty);
  const usedPhone = useQuestionStore((state) => state.usedPhone);
  const usedAudience = useQuestionStore((state) => state.usedAudience);
  const isAnswered = useQuestionStore((state) => state.isAnswered);
  const isCorrect = useQuestionStore((state) => state.isCorrect);
  const prizeLevel = useQuestionStore((state) => state.prizeLevel);
  const selectedAnswer = useQuestionStore((state) => state.selectedAnswer);
  const openPrize = useQuestionStore((state) => state.openPrize);
  const isConfirmed = useQuestionStore((state) => state.isConfirmed);
  const finallyIsCorrectAns = useQuestionStore(
    (state) => state.finallyIsCorrectAns
  );
  const finallyUserLevel = useQuestionStore((state) => state.finallyUserLevel);
  const revealCorrectAnswer = useQuestionStore(
    (state) => state.revealCorrectAnswer
  );
  const showRevealCorrect = useQuestionStore(
    (state) => state.showRevealCorrect
  );
  const showCheckpoint = useQuestionStore((state) => state.showCheckpoint);

  const updateDataInFirebase = useQuestionStore(
    (state) => state.updateDataInFirebase
  );
  const updateDataInStore = useQuestionStore(
    (state) => state.updateDataInStore
  );
  return (
    {
        usedFifty,
        usedPhone,
        usedAudience,
        isAnswered,
        isCorrect,
        prizeLevel,
        selectedAnswer,
        openPrize,
        isConfirmed,
        finallyIsCorrectAns,
        finallyUserLevel,
        revealCorrectAnswer,
        showRevealCorrect,
        showCheckpoint,
        updateDataInFirebase,
        updateDataInStore,
    }
  )
}
