import React, { useCallback, useMemo } from "react";
import Input from "../Input";
import SingleChoice from "../SingleChoice";
import { shuffleArray } from "../../utils/shuffle-array";
import styled from "styled-components";
import { useQuestions } from "../../contexts/questions";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InlineContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Badge = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border-color: darkblue;
  color: darkblue;
  padding: 2px 16px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  align-self: flex-start;
`;

const Title = styled.h2`
  font-weight: bold;
`;

type QuestionProps = {
  onChangeCurrentValue: (value: string) => void;
};

export const Question = ({ onChangeCurrentValue }: QuestionProps) => {
  const { currentQuestion: question } = useQuestions();

  const randomAnswers = useMemo(
    () =>
      shuffleArray([
        question.correct_answer,
        ...(question.incorrect_answers || []),
      ]),
    [question.correct_answer, question.incorrect_answers],
  );

  const onChangeAnswer = useCallback(
    (value: string) => {
      onChangeCurrentValue(value);
    },
    [onChangeCurrentValue, question],
  );

  if (!question) {
    return null;
  }

  return (
    <QuestionContainer>
      <InlineContainer>
        <Badge color="lightgrey">{question.category}</Badge>
        <Badge color="pink">{question.difficulty}</Badge>
      </InlineContainer>
      <Title>{question.question}</Title>
      {question.type === "text" && <Input onChange={onChangeAnswer} />}
      {(question.type === "boolean" || question?.type === "multiple") && (
        <SingleChoice
          onChange={onChangeAnswer}
          answers={randomAnswers as string[]}
        />
      )}
    </QuestionContainer>
  );
};
