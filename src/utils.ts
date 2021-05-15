import { NUM_BOXES } from "./config";
import { Event } from "./types";

export function getRandomIndex(total: number): number {
  return Math.floor(Math.random() * total);
}

function getRandomElement<T>(list: T[]): T {
  return list[getRandomIndex(list.length)];
}

function range(total: number): number[] {
  const result  = [];
  for (let i = 0; i < total; i++) {
    result.push(i);
  }
  return result;
}
export function generateSequence(winningIndex: number): Event[] {
  const options = range(NUM_BOXES);
  const userPick = getRandomElement(options);
  const montyPick = getRandomElement(options.filter(v => v !== userPick && v !== winningIndex));
  const userFinal = getRandomElement(options.filter(v => v !== userPick && v !== montyPick));
  return [{ name: "userPick", index: userPick }, {name: "montyPick", index: montyPick }, { name: "userFinal", index: userFinal }];
}
