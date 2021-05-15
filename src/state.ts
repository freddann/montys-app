import { useEffect, useState } from "react";
import { NUM_BOXES } from "./config";
import { Box, Event, PickedBy, Stats, GameState } from "./types";
import { getRandomElement, range } from "./utils";


function setPickedBy(boxes: Box[], targetIndex: number, value: PickedBy): Box[] {
  return boxes.map((box, index) => targetIndex === index ? { ...box, pickedBy: value } : box);
}

function replacePickedBy(boxes: Box[], targetIndex: number, value: PickedBy) {
  const previousUserBox = boxes.find(box => box.pickedBy === value);
  if (!previousUserBox) {
    throw "Invalid sequence of events, userFinal found no previous userPick";
  }
  const withoutUserPick = setPickedBy(boxes, previousUserBox.index, null);
  return setPickedBy(withoutUserPick, targetIndex, value);
}

function getNextState(boxes: Box[], event: Event): Box[] {
  switch (event.name) {
  case "userPick":
    return setPickedBy(boxes, event.index, "user");
  case "montyPick":
    return setPickedBy(boxes, event.index, "monty");
  case "userFinal":
    return replacePickedBy(boxes, event.index, "user");
  default: throw "Invalid event name";
  }
}

export function getInitialState(boxRange: number[]): Box[] {
  return boxRange.map(index => ({ index, isOpen: false, pickedBy: null }));
}

export function asAnimatedBoxes(sequence: Event[], boxRange: number[], delay: number): Box[] {
  const [state, setState] = useState(getInitialState(boxRange));
  useEffect(() => {
    setState(getInitialState(boxRange));
    const timerIds = sequence.map((event, i) => window.setTimeout(() => {
      setState(boxes => getNextState(boxes, event));
    }, delay * (i+1)));

    return () => { timerIds.map(window.clearTimeout); };
  }, [sequence]);
  return state;
}

export function useStats(): Stats {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  return { wins, losses, addResult: (win: boolean) => {
    if (win) setWins(v => v+1);
    else setLosses(v => v+1);
  }, reset: () => {
    setWins(0);
    setLosses(0);
  } };
}

export function generateGameState(numBoxes: number): GameState {
  const boxRange = range(numBoxes);
  const winningIndex = getRandomElement(boxRange);
  const userPick = getRandomElement(boxRange);
  const montyPick = getRandomElement(boxRange.filter(v => v !== userPick && v !== winningIndex));
  const userFinalPick = getRandomElement(boxRange.filter(v => v !== userPick && v !== montyPick));
  return {
    boxRange,
    sequence: [{ name: "userPick", index: userPick }, { name: "montyPick", index: montyPick }, { name: "userFinal", index: userFinalPick }],
    userFinalPick,
    winningIndex,
  };
}
  
export const DEFAULT_GAME_STATE: GameState = { boxRange: range(NUM_BOXES), sequence: [], userFinalPick: -1, winningIndex: -1 };
