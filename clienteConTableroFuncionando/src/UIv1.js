import { UI_BUILDER } from "./Ui.js";
import { Controlls } from "./entities/controlls.js"

export const data = {
    "data-x": "data-x",
    "data-y": "data-y",
    "data-player": "data-player",
    "data-bush": "data-bush"
}

export const UIv1 = UI_BUILDER.init();

UIv1.initUI = () => {
    const base = document.getElementById(UIv1.uiElements.board);
    base.classList.add("board");
}

UIv1.drawBoard = (board) => {
    if (board !== undefined) {
        const base = document.getElementById(UIv1.uiElements.board);
        base.innerHTML = '';
        base.style.gridTemplateColumns = `repeat(${board.map.length}, 40px)`;
        base.style.gridTemplateRows = `repeat(${board.map.length}, 40px)`;
        let x = 1
        let y = 1
        board.map.forEach(element => element.forEach((element) => {

            const tile = document.createElement("div");
            tile.classList.add("tile");
            if (element === 5) {
                tile.style.backgroundColor = "green";
                tile.setAttribute(data["data-bush"], "true");
            }
            if (x > 10) {
                x = 1;
                y++;
            }
            tile.setAttribute(data["data-x"], x);
            tile.setAttribute(data["data-y"], y);
            x++;
            base.appendChild(tile);
            anime({
                targets: tile,
                opacity: [0, 1],
                duration: (Math.random() * 8000) + 1000,
                easing: 'easeInOutQuad'
            });
        }));
    }
}

UIv1.drawPlayers = (players) => {
    console.log(players)
    const element = document.querySelectorAll(".tile");
    element.forEach(tile => {
        players.forEach(player => {
            if (player.x == tile.getAttribute(data["data-x"]) && player.y == tile.getAttribute(data["data-y"])) {
                tile.style.backgroundColor = "blue";
                tile.setAttribute("id", player.id);
                tile.setAttribute(data["data-player"], "player");
            }
        })
    })
}

UIv1.drawControllers = () => {
    const base = document.getElementById(UIv1.uiElements.controllers);
    const allControllers = [Controlls.move, Controlls.rotate, Controlls.shot];
    allControllers.forEach(element => {
        const button = document.createElement("button");
        button.setAttribute("id", element);
        button.textContent = element;
        base.appendChild(button);
    });
}

UIv1.movePlayer = (player) => {
    console.log(player)
    const element = document.querySelectorAll(".tile");
    const oldTile = document.getElementById(player.id);
    if (oldTile) {
        oldTile.removeAttribute("id");
        oldTile.setAttribute("class", "tile");
        oldTile.style.removeProperty("background-color");
    }
    element.forEach(tile => {
        if (tile.getAttribute(data["data-x"]) == player.x && tile.getAttribute(data["data-y"]) == player.y) {
            tile.style.backgroundColor = "blue";
            tile.setAttribute("id", player.id);
            tile.setAttribute(data["data-player"], "player");
        }
    });
}

UIv1.checkPlayer = (player) => {
    const tiles = Array.from(document.querySelectorAll(".tile"));
    if (tiles.find((element) => player.x == element.getAttribute(data["data-x"]) && player.y == element.getAttribute(data["data-y"])) == undefined ||
        tiles.find((element) => player.x == element.getAttribute(data["data-x"]) && player.y == element.getAttribute(data["data-y"])).hasAttribute(data["data-player"]) == undefined ||
        tiles.find((element) => player.x == element.getAttribute(data["data-x"]) && player.y == element.getAttribute(data["data-y"])).hasAttribute(data["data-player"])) {
        return true;
    } else {
        return false;
    }
}

UIv1.checkVisibility = (player) => {
    const tiles = Array.from(document.querySelectorAll(".tile"));
    if (tiles.find((element) => player.x == element.getAttribute(data["data-x"]) && player.y == element.getAttribute(data["data-y"])).hasAttribute(data["data-bush"]) == undefined) {
        return true;
    } else {
        return false;
    }
}

UIv1.checkFire = (x, y) => {
    const tiles = Array.from(document.querySelectorAll(".tile"));
    let idShooted = ""
    tiles.forEach(tile => {
        if ((x == tile.getAttribute(data["data-x"]) && y == tile.getAttribute(data["data-y"]) == undefined )||
            (x == tile.getAttribute(data["data-x"]) && y == tile.getAttribute(data["data-y"]) && tile.hasAttribute(data["data-player"]))){
            idShooted =  tile.getAttribute("id");
        }
    });
    return idShooted;
}

UIv1.checkPlayerStatus = (player) => {
    console.log(player)
    const element = document.querySelectorAll(".tile");
    if (player.state == "Dead") {
        element.forEach(tile => {
            if (tile.getAttribute(data["data-x"]) == player.x && tile.getAttribute(data["data-y"]) == player.y) {
                if(tile.hasAttribute(data["data-bush"])){
                    tile.style.backgroundColor = "green";
                } else{
                    tile.style.backgroundColor = "none";
                    tile.removeAttribute("id");
                    tile.removeAttribute(data["data-player"]);
                }
            }
        });
    }
}

UIv1.drawBoard();
UIv1.drawControllers();
