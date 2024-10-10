import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchItems } from "../api";
import { QuestionResponseType, QuestionType } from "../types";
import { shuffleArray } from "../utils/shuffle-array";

type QuestionsContextProviderProps = {
  children: React.ReactNode;
};

type QuestionContextType = {
  questions: QuestionResponseType;
  moveToNextQuestion: () => void;
  currentQuestion: QuestionType;
  index: number;
};

const initialValue = {
  response_code: -1,
  results: [],
};

const initialContextValue = {
  questions: initialValue,
  currentQuestion: {
    category: "",
    type: "text",
    difficulty: "easy",
    question: "",
    correct_answer: "",
    incorrect_answers: [""],
  } as QuestionType,
  moveToNextQuestion: () => null,
  index: 0,
};

const QuestionsContext =
  createContext<QuestionContextType>(initialContextValue);

export const QuestionsContextProvider = ({
  children,
}: QuestionsContextProviderProps) => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] =
    useState<QuestionResponseType>(initialValue);

  const currentQuestion = useMemo(
    () => questions.results[index],
    [index, questions.results],
  );

  const moveToNextQuestion = () => {
    if (index === questions.results.length) {
      setIndex(0);
    }
    if (index < questions.results.length) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    fetchItems().then((result) => {
      const shuffledQuestions = shuffleArray(result?.results);
      setQuestions({
        ...result,
        results: shuffledQuestions as QuestionType[],
      });
    });
  }, []);

  return (
    <QuestionsContext.Provider
      value={{ questions, currentQuestion, moveToNextQuestion, index }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  const questions = useContext(QuestionsContext);
  return questions;
};
