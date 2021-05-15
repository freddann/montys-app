export interface Event {
    name: "userPick" | "montyPick" | "userFinal";
    index: number;
}

export type PickedBy = "user" | "monty" | null;
export interface Box {
    index: number;
    pickedBy: PickedBy;
}
