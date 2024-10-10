import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QuestionsContextProvider, useQuestions } from "./questions";
import { fetchItems } from "../api";
import { shuffleArray } from "../utils/shuffle-array";

jest.mock("../api", () => ({
  fetchItems: jest.fn(),
}));
jest.mock("../utils/shuffle-array", () => ({
  shuffleArray: jest.fn((arr) => arr),
}));

const mockQuestions = {
  response_code: 0,
  results: [
    {
      question: "Q1",
      correct_answer: "A1",
      incorrect_answers: ["incorrect"],
    },
    {
      question: "Q2",
      correct_answer: "A2",
      incorrect_answers: ["incorrect"],
    },
  ],
};

const TestComponent = () => {
  const { currentQuestion, moveToNextQuestion, index } = useQuestions();
  return (
    <div>
      <p data-testid="currentQuestion">{currentQuestion?.question}</p>
      <p data-testid="currentIndex">currentIndex: {index}</p>
      <button onClick={moveToNextQuestion}>Next Question</button>
    </div>
  );
};

describe("QuestionsContextProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchItems as jest.Mock).mockResolvedValue(mockQuestions);
    (shuffleArray as jest.Mock).mockImplementation((questions) => questions);
  });

  it("updates the index and move to next question", async () => {
    render(
      <QuestionsContextProvider>
        <TestComponent />
      </QuestionsContextProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Q1")).toBeVisible();
    });

    act(() => {
      screen.getByText("Next Question").click();
    });

    expect(screen.getByTestId("currentQuestion")).toHaveTextContent("Q2");
    expect(screen.getByTestId("currentIndex")).toHaveTextContent(
      "currentIndex: 1",
    );
  });

  it("resets the index when the last question is reached", async () => {
    render(
      <QuestionsContextProvider>
        <TestComponent />
      </QuestionsContextProvider>,
    );

    await screen.findByTestId("currentQuestion");

    act(() => {
      screen.getByText("Next Question").click();
      screen.getByText("Next Question").click();
    });

    expect(screen.getByTestId("currentQuestion")).toHaveTextContent("Q1");
    expect(screen.getByTestId("currentIndex")).toHaveTextContent(
      "currentIndex: 0",
    );
  });
});
