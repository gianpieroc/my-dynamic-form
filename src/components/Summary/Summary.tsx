import React from "react";
import { useAnswers } from "../../contexts/answers";

export const Summary = () => {
  const { summary, getFinalScore } = useAnswers();
  const score = getFinalScore();

  return (
    <div>
      <h2>Summary:</h2>
      <h4>Correct answers: {summary.correctAnswersCount}</h4>
      <h4>Wrong answers: {summary.wrongAnswersCount}</h4>
      <h4>Questions answered: {summary.questionsAnswered}</h4>
      <h4>Final Score: {score}</h4>
    </div>
  );
};
