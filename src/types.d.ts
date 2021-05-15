export interface Event {
    name: "userPick" | "montyPick" | "userFinal";
    index: number;
}

export type PickedBy = "user" | "monty" | null;
export interface Box {
    index: number;
    pickedBy: PickedBy;
}
export interface Stats {
    wins: number;
    losses: number;
    addResult: (win: boolean) => void;
    reset: () => void;
}

export interface GameState {
    boxRange: number[];
    sequence: Event[];
    userFinalPick: number;
    winningIndex: number;
}
