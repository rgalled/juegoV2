import { ConnectionHandler } from "./ConnectionHandler.js";
import { UIv1 } from "../UIv1.js";
import { Controlls } from "../entities/controlls.js";

export const setType = {
    "up": {
        "move": (player) => { player.y-- },
        "rotate": (player) => { player.direction = "right" },
        "shot": (player) => { return UIv1.checkFire(player.x , player.y-- ) }
    },
    "down": {
        "move": (player) => { player.y++ },
        "rotate": (player) => { player.direction = "left" },
        "shot": (player) => { return UIv1.checkFire(player.x , player.y++) }
    },
    "left": {
        "move": (player) => { player.x-- },
        "rotate": (player) => { player.direction = "up" },
        "shot": (player) => { return UIv1.checkFire(player.x-- , player.y ) }
    },
    "right": {
        "move": (player) => { player.x++ },
        "rotate": (player) => { player.direction = "down" },
        "shot": (player) => { return UIv1.checkFire(player.x++ , player.y ) }
    }
}

export const ControlService = (player) => {
        document.getElementById("move").addEventListener("click", (event) => {
            const oldPlayer = { ...player };
            let direction = player.direction;
            setType[direction][Controlls.move](player);
            if (!UIv1.checkPlayer(player)) {
                player.visibility = UIv1.checkVisibility(player);
                ConnectionHandler.sendMessage(
                    {
                        content: player,
                        type: "control"
                    });
            } else {
                player = oldPlayer;
            }
        })
        document.getElementById("rotate").addEventListener("click", (event) => {
            let direction = player.direction;
            setType[direction][Controlls.rotate](player);
            ConnectionHandler.sendMessage(
                {
                    content: player,
                    type: "control"
                });
        })
        document.getElementById("shot").addEventListener("click", (event) => {
            let direction = player.direction;
            let shooted = setType[direction][Controlls.shot]({...player});
            if (shooted !== null || shooted !== undefined){console.log("disparo");
                console.log(shooted);
                ConnectionHandler.sendMessage({
                content: shooted,
                type: "fire"
            });
        }
        })
}