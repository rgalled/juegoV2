import { ConnectionHandler } from "./ConnectionHandler.js";
import { UIv1 } from "../UIv1.js";

export const ControlService = (player) => {
    document.getElementById("move").addEventListener("click", (event) => {
        const oldPlayer = player;
        switch (player.direction) {
            case "up":
                player.y = player.y - 1;
                break;
            case "left":
                player.x = player.x - 1;
                break;
            case "down":
                player.y = player.y + 1;
                break;
            case "right":
                player.x = player.x + 1;
                break;
        }
        if (!UIv1.checkPlayer(player)) {
            console.log("eaaaa")
            ConnectionHandler.sendMessage(player);
        } else{
            player = oldPlayer;
        }
    })
    document.getElementById("rotate").addEventListener("click", (event) => {
        switch (player.direction) {
            case "up":
                player.direction = "right";
                break;
            case "left":
                player.direction = "up";
                break;
            case "down":
                player.direction = "left";
                break;
            case "right":
                player.direction = "down";
                break;
        }
        ConnectionHandler.sendMessage(player);
    })
    document.getElementById("shot").addEventListener("click", (event) => {
        console.log("disparo");
    })
}