import { UI_BUILDER } from "./Ui.js";

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
            }
            if (x > 10) {
                x = 1;
                y++;
            }
            tile.setAttribute("data-x", x);
            tile.setAttribute("data-y", y);
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
            if (player.x == tile.getAttribute("data-x") && player.y == tile.getAttribute("data-y")) {
                tile.style.backgroundColor = "blue";
                tile.setAttribute("id", player.id);
                tile.setAttribute("data-player", "player");
            }
        })
    })
}

UIv1.drawControllers = () => {

    const base = document.getElementById(UIv1.uiElements.controllers);
    const allControllers = ["move", "shot", "rotate"];
    allControllers.forEach(element => {
        const button = document.createElement("button");
        button.setAttribute("id", element);
        button.textContent = element;
        base.appendChild(button);
    });
}

UIv1.movePlayer = (player) => {
    console.log("DRAWING PLAYER")
    console.log(player)
    const element = document.querySelectorAll(".tile");
    const oldTile = document.getElementById(player.id);
    if (oldTile) {
        oldTile.removeAttribute("id");
        oldTile.setAttribute("class", "tile");
        oldTile.style.removeProperty("background-color");
    }
    element.forEach(tile => {
        if (tile.getAttribute("data-x") == player.x && tile.getAttribute("data-y") == player.y) {
            tile.style.backgroundColor = "blue";
            tile.setAttribute("id", player.id);
            tile.setAttribute("data-player", "player");
        }
    });
}

UIv1.checkPlayer = (player) => {
    const tiles = Array.from(document.querySelectorAll(".tile"));
    if (tiles.find((element) => player.x == element.getAttribute("data-x") && player.y == element.getAttribute("data-y")).hasAttribute("data-player") == undefined ||
        tiles.find((element) => player.x == element.getAttribute("data-x") && player.y == element.getAttribute("data-y")).hasAttribute("data-player")) {
        return true;
    } else {
        return false;
    }
}

UIv1.drawBoard();
UIv1.drawControllers();
