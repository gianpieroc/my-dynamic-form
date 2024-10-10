import React, { createContext, useContext, useState } from "react";
import { AnswerResponseType } from "../types";
import { useQuestions } from "./questions";

type AnswersContextProviderProps = {
  children: React.ReactNode;
};

type AnswerContextType = {
  summary: AnswerResponseType;
  addAnswer: (isCorrect: boolean, hasSkipped: boolean) => void;
  resetAnswers: () => void;
  getFinalScore: () => number;
};

const initialValue = {
  summary: {
    correctAnswersCount: 0,
    wrongAnswersCount: 0,
    questionsAnswered: 0,
  },
  addAnswer: () => null,
  resetAnswers: () => null,
  getFinalScore: () => 0,
};

const AnswersContext = createContext<AnswerContextType>(initialValue);

const calculateFinalScore = (
  correctAnswersCount: number,
  questionsLength: number,
): number => {
  return +((100 * correctAnswersCount) / questionsLength).toFixed(2);
};

export const AnswersContextProvider = ({
  children,
}: AnswersContextProviderProps) => {
  const [answers, setAnswers] = useState<AnswerContextType>(initialValue);
  const { questions } = useQuestions();

  const getFinalScore = () => {
    return calculateFinalScore(
      answers.summary.correctAnswersCount,
      questions.results.length,
    );
  };

  const addAnswer = (isCorrectAnswer: boolean, hasSkippedAnswer: boolean) => {
    const questionsAnswered = answers.summary.questionsAnswered;
    const correctAnswersCount = answers.summary.correctAnswersCount;
    const wrongAnswersCount = answers.summary.wrongAnswersCount;

    if (hasSkippedAnswer) {
      return;
    }

    if (isCorrectAnswer) {
      setAnswers({
        ...answers,
        summary: {
          ...answers.summary,
          correctAnswersCount: correctAnswersCount + 1,
          questionsAnswered: questionsAnswered + 1,
        },
      });
    } else {
      setAnswers({
        ...answers,
        summary: {
          ...answers.summary,
          wrongAnswersCount: wrongAnswersCount + 1,
          questionsAnswered: questionsAnswered + 1,
        },
      });
    }
  };

  const resetAnswers = () => {
    setAnswers(initialValue);
  };

  return (
    <AnswersContext.Provider
      value={{ ...answers, addAnswer, resetAnswers, getFinalScore }}
    >
      {children}
    </AnswersContext.Provider>
  );
};

export const useAnswers = () => {
  const answers = useContext(AnswersContext);
  return answers;
};
