import { io } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";
import { GameService } from "./GameService.js";

export const ConnectionHandler = {
    connected: false,
    socket: null,
    url: null,
    controller: null,
    init: (url, controller, onConnectedCallBack, onDisconnectedCallBack) => {
        ConnectionHandler.url = url;
        ConnectionHandler.controller = controller;
        ConnectionHandler.socket = io(url);
        ConnectionHandler.socket.onAny((message, payload) => {
            console.log("Esta llegando: ");
            console.log(payload);
            console.log(payload.type);
            console.log(payload.content);
          });

          ConnectionHandler.socket.on("connect", (data) => {
            ConnectionHandler.socket.on("connectionStatus", (data) => {
                ConnectionHandler.connected = true;
                console.log(data);
                onConnectedCallBack();
            });
            ConnectionHandler.socket.on("message", (payload) => {
                ConnectionHandler.controller.actionController(payload);
                ConnectionHandler.socket.emit("message",{ type: "HELLO", content: "Hello world!"});
            })
            ConnectionHandler.socket.on("disconnect", () => {
                ConnectionHandler.connected = false;
                onDisconnectedCallBack();
            });
        })
    },
    sendMessage : (data)=>{
        ConnectionHandler.socket.emit("playerAction", data);
    }
}