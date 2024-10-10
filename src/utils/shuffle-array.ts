/* Durstenfeld shuffle algorithm */

import { QuestionType } from "../types";

export const shuffleArray = (
  array: QuestionType[] | string[],
): QuestionType[] | string[] => {
  const shuffled = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled as unknown as string[];
};
