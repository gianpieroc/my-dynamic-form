import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { AnswersContextProvider, useAnswers } from "./answers";
import { useQuestions } from "./questions";

jest.mock("./questions");

const TestComponent = () => {
  const { summary, addAnswer, resetAnswers } = useAnswers();
  return (
    <div>
      <h1>Answers</h1>
      <pre data-testid="answers">{JSON.stringify(summary)}</pre>
      <button onClick={() => addAnswer(true, false)}>Add Correct Answer</button>
      <button onClick={() => addAnswer(false, false)}>Add Wrong Answer</button>
      <button onClick={resetAnswers}>Reset Answers</button>
    </div>
  );
};

describe("AnswersContextProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds a correct answer and updates state correctly", async () => {
    (useQuestions as jest.Mock).mockReturnValue({
      results: new Array(3).fill(null),
    });

    render(
      <AnswersContextProvider>
        <TestComponent />
      </AnswersContextProvider>,
    );

    screen.getByText("Add Correct Answer").click();

    await waitFor(() => {
      expect(screen.getByTestId("answers")).toHaveTextContent(
        JSON.stringify({
          correctAnswersCount: 1,
          wrongAnswersCount: 0,
          questionsAnswered: 1,
        }),
      );
    });
  });

  it("adds a wrong answer and updates state correctly", async () => {
    (useQuestions as jest.Mock).mockReturnValue({
      results: new Array(3).fill(null),
    });

    render(
      <AnswersContextProvider>
        <TestComponent />
      </AnswersContextProvider>,
    );

    screen.getByText("Add Wrong Answer").click();

    await waitFor(() => {
      expect(screen.getByTestId("answers")).toHaveTextContent(
        JSON.stringify({
          correctAnswersCount: 0,
          wrongAnswersCount: 1,
          questionsAnswered: 1,
        }),
      );
    });
  });

  it("resets answers to initial state", async () => {
    (useQuestions as jest.Mock).mockReturnValue({
      results: new Array(3).fill(null),
    });

    render(
      <AnswersContextProvider>
        <TestComponent />
      </AnswersContextProvider>,
    );

    screen.getByText("Add Correct Answer").click();
    await waitFor(() => {
      expect(screen.getByTestId("answers")).toHaveTextContent(
        JSON.stringify({
          correctAnswersCount: 1,
          wrongAnswersCount: 0,
          questionsAnswered: 1,
        }),
      );
    });

    screen.getByText("Reset Answers").click();

    await waitFor(() => {
      expect(screen.getByTestId("answers")).toHaveTextContent(
        JSON.stringify({
          correctAnswersCount: 0,
          wrongAnswersCount: 0,
          questionsAnswered: 0,
        }),
      );
    });
  });
});
