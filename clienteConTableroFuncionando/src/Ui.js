const UI = {
    drawBoard: () => { throw new TypeError('Debes cambiar este método para usarlo!') },
    initUI: ()  => { throw new TypeError('Debes cambiar este método para usarlo!') },
    drawControllers : () => { throw new TypeError('Debes cambiar este método para usarlo!') },
    drawPlayers : ()=>{ throw new TypeError('Debes cambiar este método para usarlo!') },
    movePlayer:()=>{throw new TypeError('Debes cambiar este método para usarlo!')},
    checkPlayer:()=>{throw new TypeError('Debes cambiar este método para usarlo!')},
    checkVisibility:()=>{throw new TypeError('Debes cambiar este método para usarlo!')},
    checkFire:()=>{throw new TypeError('Debes cambiar este método para usarlo!')},
    checkPlayerStatus:()=>{throw new TypeError('Debes cambiar este método para usarlo!')},
    uiElements : {
        board : "board",
        controllers : "controllers"
    }
}

export const UI_BUILDER = {
    init: () => ({...UI})
}