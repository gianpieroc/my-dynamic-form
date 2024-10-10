import React, { ChangeEvent } from "react";

type SingleChoiceType = {
  answers: string[];
  onChange: (value: string) => void;
};

export const SingleChoice = ({ answers, onChange }: SingleChoiceType) => {
  const onChangeSingleChoice = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      {answers.map((answer, index) => (
        <div key={answer}>
          <input
            type="radio"
            value={answer}
            name={"answer"}
            data-testId={`radio-input-${index}`}
            id={`answer-options-${answer}`}
            onChange={onChangeSingleChoice}
          />
          <label htmlFor={`answer-options-${answer}`}>{answer}</label>
        </div>
      ))}
    </>
  );
};
