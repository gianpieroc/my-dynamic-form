import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";
import { useQuestions } from "../contexts/questions";
import { useAnswers } from "../contexts/answers";

jest.mock("../contexts/questions", () => ({
  useQuestions: jest.fn(),
}));

jest.mock("../contexts/answers", () => ({
  useAnswers: jest.fn(),
}));

const useQuestionsHook = useQuestions as jest.Mock;
const useAnswersHook = useAnswers as jest.Mock;

describe("App Component", () => {
  const mockAddAnswer = jest.fn();
  const mockResetAnswers = jest.fn();
  const mockMoveToNextQuestion = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the first question", () => {
    useQuestionsHook.mockReturnValue({
      questions: {
        results: [{ question: "Q2", correct_answer: "B" }],
      },
      currentQuestion: {
        question: "Q2",
        correct_answer: "B",
        incorrect_answers: ["C", "D"],
      },
      moveToNextQuestion: mockMoveToNextQuestion,
      index: 0,
    });
    useAnswersHook.mockReturnValue({
      addAnswer: mockAddAnswer,
      resetAnswers: mockResetAnswers,
    });

    render(<App />);

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(mockAddAnswer).toHaveBeenCalledWith(false, true);
    expect(mockMoveToNextQuestion).toHaveBeenCalled();
  });

  it("triggers skipped answers", () => {
    useQuestionsHook.mockReturnValue({
      questions: {
        results: [{ question: "Q1", correct_answer: "4" }],
      },
      currentQuestion: { question: "Q1", correct_answer: "4" },
      moveToNextQuestion: mockMoveToNextQuestion,
      index: 0,
    });
    useAnswersHook.mockReturnValue({
      addAnswer: mockAddAnswer,
      resetAnswers: mockResetAnswers,
      getFinalScore: () => 30,
    });

    render(<App />);

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(mockAddAnswer).toHaveBeenCalledWith(false, true);
    expect(mockMoveToNextQuestion).toHaveBeenCalled();
  });

  it("shows the summary after all questions are answered", () => {
    useQuestionsHook.mockReturnValue({
      questions: {
        results: [{ question: "Q1", correct_answer: "4" }],
      },
      currentQuestion: null,
      moveToNextQuestion: mockMoveToNextQuestion,
      index: 1,
    });
    useAnswersHook.mockReturnValue({
      addAnswer: mockAddAnswer,
      resetAnswers: mockResetAnswers,
      getFinalScore: () => 30,
      summary: {
        correctAnswersCount: 10,
        wrongAnswersCount: 1,
        questionsAnswered: 11,
      },
    });

    render(<App />);

    expect(screen.getByText("Summary:")).toBeVisible();
    expect(screen.getByText("Correct answers: 10")).toBeVisible();
    expect(screen.getByText("Wrong answers: 1")).toBeVisible();
    expect(screen.getByText("Retry")).toBeVisible();
  });
});
