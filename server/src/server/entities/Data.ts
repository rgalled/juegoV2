type ActionType = "control" | "fire";

export interface Data {
    type: ActionType;
    content: any;
}