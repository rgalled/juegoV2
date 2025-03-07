import { Board } from "./entities/Board";

export class BoardBuilder {
    private board: Board;
    
    constructor() {
        this.board = {
            size: 10,
            elements: [],
            positions: []
        }
        const map : Array<number[]> = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,5,0,0,0],
            [0,5,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,5,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,5,0],
            [0,0,5,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,5,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ]
        for(let i = 0; i < this.board.size; i++)
            for(let j = 0; j < this.board.size; j++)
                if(map[i][j] != 0) {
                    this.board.elements.push({x : i, y : j})
                }
        this.board.positions = [{x : 1, y : 1},{x : this.board.size, y : 1},{x : 1, y : this.board.size},{x : this.board.size, y : this.board.size}]
    }

    public getBoard() : Board {
        return this.board;
    }
}