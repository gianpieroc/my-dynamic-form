import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Question from "./index";
import { useQuestions } from "../../contexts/questions";
import { shuffleArray } from "../../utils/shuffle-array";

jest.mock("../../contexts/questions", () => ({
  useQuestions: jest.fn(),
}));
jest.mock("../../utils/shuffle-array", () => ({
  shuffleArray: jest.fn((arr) => arr),
}));

const useQuestionsHook = useQuestions as jest.Mock;

describe("Question Component", () => {
  const mockOnChangeCurrentValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders text input for text type question", () => {
    useQuestionsHook.mockReturnValue({
      currentQuestion: {
        category: "category",
        difficulty: "easy",
        question: "Q1",
        correct_answer: "John",
        incorrect_answers: ["Alan"],
        type: "text",
      },
    });

    render(<Question onChangeCurrentValue={mockOnChangeCurrentValue} />);

    expect(screen.getByText("category")).toBeInTheDocument();
    expect(screen.getByText("easy")).toBeInTheDocument();
    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByTestId("text-input")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("text-input"), {
      target: { value: "John" },
    });

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
  });

  it("renders multiple choice answers for multiple type question", () => {
    const mockShuffledAnswers = ["Answer 1", "Answer 2", "Answer 3"];
    useQuestionsHook.mockReturnValue({
      currentQuestion: {
        category: "category",
        difficulty: "easy",
        question: "Q2",
        correct_answer: "A",
        incorrect_answers: ["B", "C"],
        type: "multiple",
      },
    });
    (shuffleArray as jest.Mock).mockReturnValue(mockShuffledAnswers);

    render(<Question onChangeCurrentValue={mockOnChangeCurrentValue} />);

    expect(screen.getByText("category")).toBeInTheDocument();
    expect(screen.getByText("easy")).toBeInTheDocument();
    expect(screen.getByText("Q2")).toBeInTheDocument();
  });

  it("renders boolean answers for boolean type question", () => {
    const mockShuffledAnswers = ["True", "False"];
    useQuestionsHook.mockReturnValue({
      currentQuestion: {
        category: "category",
        difficulty: "hard",
        question: "Q3",
        correct_answer: "True",
        incorrect_answers: ["False"],
        type: "boolean",
      },
    });
    (shuffleArray as jest.Mock).mockReturnValue(mockShuffledAnswers);

    render(<Question onChangeCurrentValue={mockOnChangeCurrentValue} />);

    expect(screen.getByText("category")).toBeInTheDocument();
    expect(screen.getByText("hard")).toBeInTheDocument();
    expect(screen.getByText("Q3")).toBeInTheDocument();
  });
});
