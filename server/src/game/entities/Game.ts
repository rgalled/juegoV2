import { Room } from "../../room/entities/Room";
import { Board } from "./Board";

export enum GameStates {
    WAITING, PLAYING, ENDED
}

export enum Messages {
    BOARD = "BOARD",
    NEW_PLAYER = "NEW_PLAYER",
    SET_PLAYERS = "SET_PLAYERS",
    UPLOAD_PLAYER = "UPLOAD_PLAYER"
}

export interface Game {
    id : String,
    state: GameStates,
    room: Room,
    board: Board
}