import { Board } from "../entities/Board.js";
import { Player,PlayerHandler } from "../entities/Player.js";
import { Queue } from "../Queue.js";
export class GameService {
    #states = {
        WAITING : 0,
        PLAYING : 1,
        ENDED : 2
    };
    #ui = null;
    #playerHandler = null;
    #board = null;
    #queue = null;
    #state = null;
    #parallel = null;

    #actionsList = {
        "NEW_PLAYER" : this.do_newPlayer.bind(this),
        "BOARD" : this.do_newBoard.bind(this),
        "SET_PLAYERS" : this.do_setPlayers.bind(this),
        "UPLOAD_PLAYER" : this.do_uploadPlayer.bind(this),
    };

    constructor(ui){
        this.#playerHandler = new PlayerHandler();
        this.#state = this.#states.WAITING;
        this.#board = new Board();
        this.#queue = new Queue();
        this.#parallel = null;
        this.checkScheduler();
        this.#ui = ui;
    }

    checkScheduler() {
        if (!this.#queue.isEmpty()) {
            if (this.#parallel == null) {
                this.#parallel = setInterval(
                    async ()=>{
                        const action = this.#queue.getMessage();
                        if (action != undefined) {
                            await this.#actionsList[action.type] (action.content);
                        } else {
                            this.stopScheduler();
                        }
                    }
                );
            }
        }
    }

    stopScheduler() {
        clearInterval(this.#parallel);
        this.#parallel = null;
    }

    do (data) {
        this.#queue.addMessage(data);
        this.checkScheduler();
    };

    async do_newPlayer (payload) {
        this.#playerHandler.setPlayer(payload);
    };

    async do_newBoard(payload) {
        this.#board.build(payload);
        await this.#ui.drawBoard(this.#board.map);
    }

    async do_setPlayers(payload){
        this.#playerHandler.setYourPlayer(payload);
    }

    async do_uploadPlayer(payload){
        console.log("se actualiza el jugador");
        this.#playerHandler.uploadPlayer(payload);
    }
    
}