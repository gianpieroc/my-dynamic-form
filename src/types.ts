export type QuestionType = {
  category: string;
  type: "multiple" | "boolean" | "text";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionResponseType = {
  response_code?: number;
  results: QuestionType[];
};

export type AnswerResponseType = {
  correctAnswersCount: number;
  wrongAnswersCount: number;
  questionsAnswered: number;
};
