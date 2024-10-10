import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: blue;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 16px 30px;
`;

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  type: "submit" | "button";
};

export const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick} data-testId="submit-button">
      {children}
    </StyledButton>
  );
};
