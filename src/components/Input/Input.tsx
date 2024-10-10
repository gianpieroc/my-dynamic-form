import React, { ChangeEvent } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 5px 10px;
  border-color: darkgrey;
  background-color: white;
  border-radius: 8px;
  border-style: solid;
`;

type InputProps = {
  onChange: (value: string) => void;
};

export const Input = ({ onChange }: InputProps) => {
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <StyledInput
      data-testId="text-input"
      onChange={onChangeInput}
      placeholder="Type your answer here"
    />
  );
};
