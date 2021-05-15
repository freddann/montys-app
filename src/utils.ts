import { Event } from "./types";

export function getRandomElement<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function range(total: number): number[] {
  const result  = [];
  for (let i = 0; i < total; i++) {
    result.push(i);
  }
  return result;
}
export function generateSequence(winningIndex: number, boxRange: number[]): { sequence: Event[], userFinalPick: number } {
  const userPick = getRandomElement(boxRange);
  const montyPick = getRandomElement(boxRange.filter(v => v !== userPick && v !== winningIndex));
  const userFinalPick = getRandomElement(boxRange.filter(v => v !== userPick && v !== montyPick));
  return {
    sequence: [{ name: "userPick", index: userPick }, { name: "montyPick", index: montyPick }, { name: "userFinal", index: userFinalPick }],
    userFinalPick,
  };
}
