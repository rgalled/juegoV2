import { Socket } from "socket.io";
import { Directions, Player, PlayerStates } from "../player/entities/Player";
import { Room } from "../room/entities/Room";
import { RoomService } from "../room/RoomService";
import { Game, GameStates, Messages } from "./entities/Game";
import { BoardBuilder } from "./BoardBuilder";
import { ServerService } from "../server/ServerService"
export class GameService {
    private games: Game[];

    private static instance: GameService;
    private constructor() {
        this.games = [];
    };

    static getInstance(): GameService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GameService();
        return this.instance;
    }

    public buildPlayer(socket: Socket): Player {
        return {
            id: socket,
            x: 0,
            y: 0,
            state: PlayerStates.Idle,
            direction: Directions.Up,
            visibility: true
        }
    }

    public addPlayer(player: Player): boolean {
        const room: Room = RoomService.getInstance().addPlayer(player);
        ServerService.getInstance().sendMessageAim(player.id.id, Messages.SET_PLAYERS, {
            "id": player.id.id,
            "x": player.x,
            "y": player.y,
            "direction": player.direction,
            "state": player.state,
            "visibility": player.visibility,
        });
        const genRanHex = (size: Number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        if (room.players.length == 1) {
            const game: Game = {
                id: "game" + genRanHex(128),
                state: GameStates.WAITING,
                room: room,
                board: new BoardBuilder().getBoard()
            }
            room.game = game;
            this.games.push(game);
        }

        if (room.occupied) {
            if (room.game) {
                room.game.state = GameStates.PLAYING;
                if (ServerService.getInstance().isActive()) {
                    console.log("a jugar")
                    let players: any = [];
                    let clonePosition: any = room.game.board.positions;
                    let max : number = 4;
                    room.players.forEach(item => {
                            let num : number =  Math.floor(Math.random() * (max - 0 ));
                            players.push({
                                "id": item.id.id,
                                "x": clonePosition[num].x,
                                "y": clonePosition[num].y,
                                "direction": item.direction,
                                "state": item.state,
                                "visibility": item.visibility,
                        });
                        max--;
                        clonePosition.splice(num,1);
                    })
                    ServerService.getInstance().sendMessage(room.name, Messages.BOARD, room.game.board);
                    ServerService.getInstance().sendMessage(room.name, Messages.NEW_PLAYER, players);
                }
            }
            return true;
        }

        return false;
    }

    public uploadPlayer(data : Player){
        console.log("a");
        this.games.forEach(game=>{
            game.room.players.forEach(player=>{
                if(player.id.id == data.id.toString()){
                    let pos : Array<Number> = this.calcMov([data.x,data.y],game.board.size);
                    data.x = pos[0];
                    data.y = pos[1];
                    console.log(data);
                    ServerService.getInstance().sendMessage(game.room.name, Messages.UPLOAD_PLAYER, data)
                }
            })
        })
    }

    private calcMov(pos: Array<Number>, size : number): Array<Number> {
        pos[0] = Math.max(1, Math.min(size, pos[0].valueOf()));
        pos[1] = Math.max(1, Math.min(size, pos[1].valueOf()));
        return pos;
    }
}
