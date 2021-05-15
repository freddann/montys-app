import { useEffect, useState } from "react";
import { Box, Event, PickedBy, Stats } from "./types";

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
    for (let i = 0; i < sequence.length; i++) {
      window.setTimeout(() => setState(boxes => getNextState(boxes, sequence[i])), delay * (i+1));
    }
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
  },
  };
}
