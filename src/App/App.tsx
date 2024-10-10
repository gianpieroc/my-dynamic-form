import React, { MouseEvent, useCallback, useState } from "react";
import { useQuestions } from "../contexts/questions";
import Question from "../components/Question";
import Button from "../components/Button";
import Summary from "../components/Summary";
import { useAnswers } from "../contexts/answers";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: sans-serif;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
`;

const renderText = (index: number, questionsLength: number) => {
  if (index === questionsLength - 1) {
    return "Check Results";
  }
  if (index === questionsLength) {
    return "Retry";
  } else {
    return "Next question";
  }
};

const checkIsCorrectAnswer = (answer: string, correctAnswer?: string) => {
  if (!correctAnswer) {
    return false;
  }
  return answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
};

export const App = () => {
  const { questions, currentQuestion, moveToNextQuestion, index } =
    useQuestions();
  const { addAnswer, resetAnswers } = useAnswers();
  const questionsLength = questions.results.length;
  const [questionAnswer, setQuestionAnswer] = useState<string>("");

  const onSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChangeCurrentValue = useCallback(
    (value: string) => {
      setQuestionAnswer(value);
    },
    [setQuestionAnswer, currentQuestion],
  );

  const checkAnswer = () => {
    const isCorrectAnswer = checkIsCorrectAnswer(
      questionAnswer,
      currentQuestion?.correct_answer,
    );
    const hasSkippedAnswer = questionAnswer === "";
    addAnswer(isCorrectAnswer, hasSkippedAnswer);
  };

  const submitQuestion = () => {
    checkAnswer();
    if (index === questionsLength) {
      resetAnswers();
    }
    setQuestionAnswer("");
    moveToNextQuestion();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <AppContainer>
          {index < questionsLength ? (
            <Question onChangeCurrentValue={onChangeCurrentValue} />
          ) : (
            <Summary />
          )}
          <Button type="submit" onClick={submitQuestion}>
            {renderText(index, questionsLength)}
          </Button>
        </AppContainer>
      </form>
    </>
  );
};
