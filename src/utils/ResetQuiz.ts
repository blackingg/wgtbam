import { QuestionArr } from '.';

export const ResetQuiz = () => {  
  const resetObj = {
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
  }

  return (
    resetObj
  )
}
