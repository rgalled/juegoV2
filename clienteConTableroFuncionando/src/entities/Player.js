export const Player = {
    x: 0,
    y: 0,
    status: 0,
    direction: 0,
    visibility: true,
}
import { UIv1 } from "../UIv1.js";
import { ControlService } from "../services/ControlService.js";

export class PlayerHandler {
    #players = [];
    #yourPlayer = null;

    constructor() {
    }

    setPlayer(players) {
        this.#players = players;
        UIv1.drawPlayers(this.#players);
        this.#setCurrentPosition();
        ControlService(this.#yourPlayer);
    }

    #setCurrentPosition() {
        this.#players.forEach(playerList => {
            if (playerList.id == this.#yourPlayer.id) {
                this.#yourPlayer = playerList;
                this.#players.splice(this.#players.indexOf(playerList), 1);
            }
        })
    }

    setYourPlayer(player) {
        this.#yourPlayer = player;
    }

    uploadPlayer(player) {
        if (this.#yourPlayer.id == player.id) {
            this.#yourPlayer = player;
        } else {
            this.#players.forEach(playerList => {
                if (playerList.id == player.id) {
                    playerList = player;
                };
            })
        }
        UIv1.checkPlayerStatus(player);
        UIv1.movePlayer(player);
    }

}