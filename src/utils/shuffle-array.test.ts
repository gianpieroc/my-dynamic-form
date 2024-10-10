import { shuffleArray } from "./shuffle-array";

describe("shuffleArray", () => {
  it("returns an array with the same length as the input", () => {
    const arr = ["A", "B", "C", "D"];
    const shuffledArr = shuffleArray(arr);
    expect(shuffledArr).toHaveLength(arr.length);
  });

  it("returns the same elements as the original array", () => {
    const arr = ["A", "B", "C", "D"];
    const shuffledArr = shuffleArray(arr);
    expect(shuffledArr.sort()).toEqual(arr.sort());
  });

  it("returns an empty array if input is empty", () => {
    const arr: string[] = [];
    const shuffledArr = shuffleArray(arr);
    expect(shuffledArr).toEqual([]);
  });

  it("returns the same single element array", () => {
    const arr = ["A"];
    const shuffledArr = shuffleArray(arr);
    expect(shuffledArr).toEqual(["A"]);
  });

  it("shuffles an array of strings correctly", () => {
    const arr = ["A", "B", "C", "D"];
    const shuffledArr = shuffleArray(arr as string[]);
    arr.forEach((item) => {
      expect(shuffledArr).toContainEqual(item);
    });
    expect(shuffledArr).not.toEqual(arr);
  });
});
